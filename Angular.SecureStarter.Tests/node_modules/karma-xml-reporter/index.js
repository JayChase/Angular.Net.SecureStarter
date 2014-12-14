// Adapted from the Karma junit reporter
var os = require('os');
var path = require('path');
var fs = require('fs');
var builder = require('xmlbuilder');


var XmlReporter = function (baseReporterDecorator, config, logger, helper, formatError) {
	var log = logger.create('reporter.xml');
	var reporterConfig = config.xmlReporter || {};
	var outputFile = helper.normalizeWinPath(path.resolve(config.basePath, reporterConfig.outputFile || 'test-results.testxml'));

	var xml;
	var pendingFileWritings = 0;
	var fileWritingFinished = function () { };
	var allMessages = [];

	baseReporterDecorator(this);

	this.adapters = [function (msg) {
		allMessages.push(msg);
	}];

	this.onRunStart = function () {
		xml = builder.create('Tests');
	};

	this.onBrowserStart = function(browser) {
	};
	
	this.onBrowserComplete = function(browser) {
	};

	this.onRunComplete = function () {
		var xmlToOutput = xml;

		pendingFileWritings++;
		helper.mkdirIfNotExists(path.dirname(outputFile), function () {
			fs.writeFile(outputFile, xmlToOutput.end({ pretty: true }), function (err) {
				if (err) {
					log.warn('Cannot write xml\n\t' + err.message);
				} else {
					log.debug('XML results written to "%s".', outputFile);
				}

				if (!--pendingFileWritings) {
					fileWritingFinished();
				}
			});
		});

		allMessages.length = 0;
	};

	this.specSuccess = this.specSkipped = this.specFailure = function (browser, result) {
		var spec = xml.ele('Test');
		spec.ele('Name', result.suite + ' ' + result.description + ' (' + browser.name + ')');
		spec.ele('DisplayName', result.suite + ' ' + result.description + ' (' + browser.name + ')');

		if (result.success) {
			spec.ele('Outcome', 'Passed');
		}
		else if (result.skipped) {
			spec.ele('Outcome', 'Skipped');
		}
		else {
			spec.ele('Outcome', 'Failed');
			var errors = '';
			result.log.forEach(function (err) {
				errors += formatError(err) + '\r\n\r\n';
			});
			spec.ele('ErrorStackTrace', errors);
		}
	};

	// wait for writing all the xml files, before exiting
	this.onExit = function (done) {
		if (pendingFileWritings) {
			fileWritingFinished = done;
		} else {
			done();
		}
	};
};

XmlReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper', 'formatError'];

// PUBLISH DI MODULE
module.exports = {
	'reporter:xml': ['type', XmlReporter]
};