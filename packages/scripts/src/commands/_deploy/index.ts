/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { performance } from 'perf_hooks'
import { success, fail, printPerf } from '@essex/tasklogger'
import { Command } from 'commander'
import { execute } from './tasks'
import { DeployCommandOptions } from './types'

export default function deploy(program: Command): void {
	program
		.command('deploy')
		.description('deploys standard essex projects')
		.option('-v, --verbose', 'verbose output')
		.option('--storageAccount <storageAccount>', 'Azure Storage Account Id')
		.option(
			'--storageAccountKey <storageAccountKey>',
			'Azure Storage Account Key',
		)
		.option(
			'--type <type>',
			'deployment type: (e.g. azure-blob-storage)',
			'azure-blob-storage',
		)
		.option(
			'--paths <paths>',
			'When using Azure-Blob-Storage deployment, the paths to upload into the blob container, comma-delimited.',
			'build/,public/,/dist',
		)
		.action((options: DeployCommandOptions): Promise<any> => {
			return Promise.resolve()
				.then(() => execute(options))
				.then(() => success(`deploy ${printPerf(0, performance.now())}`))
				.catch(err => {
					console.log('error in deploy', err)
					process.exitCode = 1
					fail(`deploy ${printPerf(0, performance.now())}`)
				})
		})
}
