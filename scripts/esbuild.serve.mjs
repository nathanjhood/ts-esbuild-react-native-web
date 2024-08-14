/// <reference lib="ESNext" />

//@ts-check

import * as esbuild from 'esbuild';
import * as config from '../esbuild.config.mjs';
// import * as tsc from './tsc.serve.mjs';
import process from 'process';


/**
 *
 */
class DevServer {

  /**
   * @param {esbuild.BuildOptions} buildOptions
   * @param {esbuild.ServeOptions} serveOptions
   * @param {esbuild.WatchOptions} watchOptions
   */
  constructor(buildOptions, serveOptions, watchOptions) {
    console.info("\n")
    console.info("buildOptions: ", { ...DevServer.buildOptions, ...buildOptions })
    console.info("serveOptions: ", { ...DevServer.serveOptions, ...serveOptions })
    console.info("watchOptions: ", { ...DevServer.watchOptions, ...watchOptions })
    console.info("\n")
    console.info("esbuild: Constructing dev server...")
    // if (this.ctx !== null) this.disposeContext()
    if (buildOptions) this.buildOptions = { ...DevServer.buildOptions, ...buildOptions }
    if (serveOptions) this.serveOptions = { ...DevServer.serveOptions, ...serveOptions }
    if (watchOptions) this.watchOptions = { ...DevServer.watchOptions, ...watchOptions }
    // this.createContext()
    console.info("esbuild: Constructed dev server.")

  }

  async process() {
    this.ctx = await this.createContext()
    .then(
      (context) => {
        if (context instanceof Error) throw new Error('', { cause: context })

        return context
      }
    )
    console.info(this.ctx)
    await this.watchContext()
    const result = await this.serveContext();
    const { host, port } = result;
    console.info(`Serving app at http://${host}:${port}.`);

    // [1] Whenever we get some data over stdin
    process.stdin.on('data', async () => {
      try {
        // [2] Cancel the already-running build
        await this.cancelContext();
        // [3] Then start a new build
        console.info('esbuild:', await this.rebuildContext());
      } catch (err) {
        console.error(err);
      }
    });

    process.stdin.on('SIGTERM', async () => {
      try {
        await this.disposeContext()
        console.info('SIGTERM - shutting down gracefully...');
      } catch (err) {
        console.error(err);
      }
    })

    process.stdin.on('SIGINT', async () => {
      try {
        await this.disposeContext()
        console.info('SIGINT - shutting down gracefully...');
      } catch (err) {
        console.error(err);
      }
    })

    return this.ctx

  }

  async shutdown() {
    console.info("esbuild: Shutting down...")
    await this.close()
  }

  /**
   * @param {any} e
  */
  handleError(e) {
    const error = new Error('Error: ', { cause: e })
    console.error(error)
    process.exit(1)
  }


  async close() {
    console.info('esbuild: shutting down gracefully...');
    try {
        await this.disposeContext()
      } catch (err) {
        console.error(err);
      }
  }

  async createContext() {
    console.info('esbuild: creating context...')
    /**
     *
     * @param {esbuild.BuildContext<esbuild.BuildOptions>} ctx
     * @returns {esbuild.BuildContext<esbuild.BuildOptions>}
     */
    const handleCreateContextSuccess = (ctx) => {
      console.info('esbuild: creating context succeeded')
      return ctx
    }
    /**
     *
     * @param {any} err
     * @returns {Error}
     */
    const handleCreateContextError = (err) => {
      const error = new Error('esbuild: creating context failed', { cause: err })
      console.error(error)
      process.exit(1);
      // return error
    }
    return await esbuild.context({ ...this.buildOptions })
      .then((context) => handleCreateContextSuccess(context))
      .catch((error) => handleCreateContextError(error))
  }

  async watchContext() {
    console.info('esbuild: watching context...')
    /**
     *
     * @returns
     */
    const handleWatchContextSuccess = () => {
      console.info('esbuild: watching context succeeded')
      return;
    }
    /**
     *
     * @param {any} err
     * @returns {Error}
     */
    const handleWatchContextError = (err) => {
      const error = new Error('esbuild: watching context failed', { cause: err })
      console.error(error)
      process.exit(1);
      // return error
    }
    if(this.ctx === null || this.ctx === undefined) return handleWatchContextError(new Error("esbuild: 'watchContext()' called on a null object..."))
    return await this.ctx.watch({ ...this.watchOptions })
      .then(()          => handleWatchContextSuccess())
      .catch((error)    => handleWatchContextError(error))
  }

  async serveContext() {
    console.info('esbuild: serving context...')
    /**
     *
     * @param {esbuild.ServeResult} result
     * @returns {esbuild.ServeResult}
     */
    const handleServeContextSuccess = (result) => {
      console.info('esbuild: serving context succeeded')
      return result;
    }
    /**
     *
     * @param {any} err
     * @returns
     */
    const handleServeContextError = (err) => {
      const error = new Error('esbuild: serving context failed', { cause: err })
      console.error(error)
      process.exit(1);
      // throw error
    }
    if(this.ctx === null || this.ctx === undefined) return handleServeContextError(new Error("esbuild: 'serveContext()' called on a null object..."))
    return await this.ctx.serve({ ...this.serveOptions })
      .then((result)    => handleServeContextSuccess(result))
      .catch((error)    => handleServeContextError(error))
  }

  async rebuildContext() {
    console.info('esbuild: rebuilding context...')
    /**
     *
     * @param {esbuild.BuildResult<esbuild.BuildOptions>} result
     * @returns {esbuild.BuildResult<esbuild.BuildOptions>}
     */
    const handleRebuildContextSuccess = (result) => {
      console.info('esbuild: rebuilding context succeeded')
      return result;
    }
    /**
     *
     * @param {any} err
     * @returns {Error}
     */
    const handleRebuildContextError = (err) => {
      const error = new Error('esbuild: rebuilding context failed', { cause: err })
      console.error(error)
      process.exit(1);
      // return error
    }
    if(this.ctx === null || this.ctx === undefined) return handleRebuildContextError(new Error("esbuild: 'rebuildContext()' called on a null object..."))
    return await this.ctx.rebuild()
      .then((result)    => handleRebuildContextSuccess(result))
      .catch((error)    => handleRebuildContextError(error))
  }

  async cancelContext() {
    console.info('esbuild: cancelling context...')
    /**
     *
     * @returns
     */
    const handleCancelContextSuccess = () => {
      console.info('esbuild: watching context succeeded')
      return;
    }
    /**
     *
     * @param {any} err
     * @returns {Error}
     */
    const handleCancelContextError = (err) => {
      const error = new Error('esbuild: watching context failed', { cause: err })
      console.error(error)
      process.exit(1);
      // return error
    }
    if(this.ctx === null || this.ctx === undefined) return handleCancelContextError(new Error("esbuild: 'cancelContext()' called on a null object..."))
    return await this.ctx.cancel()
      .then(()          => handleCancelContextSuccess())
      .catch((error)    => handleCancelContextError(error))
  }

  /**
   *
   */
  async disposeContext() {
    console.info('esbuild: disposing context...')
    /**
     *
     * @returns
     */
    const handleDisposeContextSuccess = () => {
      console.info('esbuild: disposing context succeeded')
      return;
    }
    /**
     *
     * @param {any} err
     * @returns {Error}
     */
    const handleDisposeContextError = (err) => {
      const error = new Error('esbuild: disposing context failed', { cause: err })
      console.error(error)
      process.exit(1);
      // return error
    }
    if(this.ctx === null || this.ctx === undefined) return handleDisposeContextError(new Error("esbuild: 'disposeContext()' called on a null object..."))
    return await this.ctx.dispose()
      .then(()          => handleDisposeContextSuccess())
      .catch((error)    => handleDisposeContextError(error))
  }

    /**
   *
   * @param {string} val
   * @returns {string | number | false}
   */
  static normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
      // named pipe
      return val
    }

    if (port >= 0) {
      // port number
      return port
    }

    return false
  }

  /**
   * @type {esbuild.BuildOptions}
   */
  static buildOptions

  /**
   * @type {esbuild.ServeOptions}
  */
  static serveOptions

  /**
   * @type {esbuild.WatchOptions}
  */
  static watchOptions

  /**
   * @type {esbuild.BuildContext<esbuild.BuildOptions> | null}
   * @private
  */
  static ctx = null
}

const server = new DevServer(
  config.createBuildOptions(
  /** @type {esbuild.BuildOptions} */
  {
    sourcemap: true,
    bundle: true,
    minify: false,
    treeShaking: true,
    format: 'esm',
    loader: {
      '.svg': 'dataurl',
      '.png': 'dataurl'
    },
    banner: {
      /** NODE - Append Hot reload event listener to DOM */
      js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`
    },
    }),
  /** @type {esbuild.ServeOptions} */
  {
    port: parseInt(DevServer.normalizePort(process?.env?.PORT || '3000').toString()),
    host: (process?.env?.HOST || '127.0.0.1').toString(),
    servedir: './dist',
    fallback: './dist/index.html'
  },
  /** @type {esbuild.WatchOptions} */
  {},
)

await server.process()
