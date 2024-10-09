#!/usr/bin/env -S yarn tsx
/// <reference path="src/react-app-env.d.ts" />

import React = require("react");
import Server = require("react-dom/server");
import Client = require("react-dom/client");
import prettier = require("prettier");
import type Http = require("node:http");
import http = require("node:http");
import nodeConsole = require("node:console");
import nodeNet = require("node:net");
import buffer = require("node:buffer");

type AppProps = React.PropsWithChildren<{
  env: "development" | "production" | "test";
  scrollViewStyleReset?: true | false;
  responsiveBackground?: true | false;
}>;

/**
 * TODO: SSR mode... (try executing this file with node/tsx!)
 * @example with node
 * ```sh
 * $ yarn tsx server.ts
 * ```
 * @example
 * ```sh
 * $ yarn node server.js
 * ```
 * Try replace the 'App' arrow function with your bundled
 * React application:
 * @example
 * ```ts
 * import App = require("../dist/static/js/bundle");
 * ```
 */
const App = (props: AppProps) => {
  //
  type EnvName = "development" | "production" | "test";
  type EnvInfo = {
    NODE_ENV: string;
    PUBLIC_URL: string;
    HOST: string;
    PORT: string;
    HTTPS: string;
  };
  type Environments = Record<EnvName, EnvInfo>;
  const environments: Environments = {
    development: {
      NODE_ENV: "development",
      PUBLIC_URL: "/",
      HOST: "127.0.0.1",
      PORT: "3000",
      HTTPS: "false",
    },
    production: {
      NODE_ENV: "production",
      PUBLIC_URL: "https://nathanjhood.github.io/",
      HOST: "nathanjhood.github.io",
      PORT: "80",
      HTTPS: "true",
    },
    test: {
      NODE_ENV: "test",
      PUBLIC_URL: "/",
      HOST: "127.0.0.1",
      PORT: "3000",
      HTTPS: "false",
    },
  };
  //
  /**
   * Root style-reset for full-screen React Native web apps with a root
   * `<ScrollView />` should use the following styles to ensure native parity.
   * [Learn more](https://necolas.github.io/react-native-web/docs/setup/#root-element).
   */
  const ScrollViewStyleReset = ({
    active = false,
  }: {
    active?: true | false;
  }) => {
    if (!active) return <></>;
    const scrollViewStyleReset: TrustedHTML = `
    #root,
    body,
    html {
      height: 100%
    }
    body {
      overflow: hidden
    }
    #root {
      display: flex
    }`;
    return (
      <style
        id="scroll-view-style-reset"
        dangerouslySetInnerHTML={{ __html: scrollViewStyleReset }}
      />
    );
  };
  //
  const ResponsiveBackground = ({
    active = true,
  }: {
    active?: true | false;
  }) => {
    if (!active) return <></>;
    const responsiveBackground: TrustedHTML = `
    body {
      background-color: #fff;
    }
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #000;
      }
    }`;
    return <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />;
  };

  // const root = Client.createRoot(
  //   document.getElementById("root") as HTMLElement
  // );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {/* <link rel="icon" href={ env[process.env.NODE_ENV].PUBLIC_URL + "favicon.ico"} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using ts-esbuild-react"
        />
        {/* <link rel="apple-touch-icon" href={ env[process.env.NODE_ENV].PUBLIC_URL + "logo192.png"} /> */}
        {/**
         * Disable body scrolling on web. This makes ScrollView components work
         * closer to how they do on native. However, body scrolling is often nice
         *to have for mobile web. If you want to enable it, remove this line.
         */}
        <ScrollViewStyleReset active={props.scrollViewStyleReset || false} />
        {/**
         * manifest.json provides metadata used when your web app is installed
         * on a user's mobile device or desktop.
         * See https://developers.google.com/web/fundamentals/web-app-manifest/
         */}
        {/* <link rel="manifest" href={ env[process.env.NODE_ENV].PUBLIC_URL + "manifest.json" } /> */}
        {/**
         * Notice the use of %PUBLIC_URL% in the tags above.
         * It will be replaced with the URL of the `public` folder during the build.
         * Only files inside the `public` folder can be referenced from the HTML.
         *
         * Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
         * work correctly both with client-side routing and a non-root public URL.
         * Learn how to configure a non-root public URL by running `npm run build`.
         */}
        {/**
         * Using raw CSS styles as an escape-hatch to ensure the background color
         * never flickers in dark-mode.
         */}
        <ResponsiveBackground active={props.responsiveBackground || true} />
        {/**
         * Add any additional <head> elements that you want globally available on
         * web...
         */}
        <meta name="referrer" content="no-referrer" />
        {/* <link rel="stylesheet" href={ env[process.env.NODE_ENV].PUBLIC_URL + "static/css/index.css" } /> */}
        <title>React App</title>
      </head>
      <body>
        <noscript>
          We're sorry but this application doesn't work properly without
          Javascript enabled. Please enable it to continue.
        </noscript>
        <p style={{ color: "#6f0fff" }}>Hello World!</p>
        <div id="root"></div>
        {/**
         * This HTML file is a template.
         * If you open it directly in the browser, you will see an empty page.
         *
         * You can add webfonts, meta tags, or analytics to this file.
         * The build step will place the bundled scripts into the <body> tag.
         *
         * To begin the development, run `npm start` or `yarn start`.
         * To create a production bundle, use `npm run build` or `yarn build`.
         */}
        {/* <script type="module" src={ env[process.env.NODE_ENV].PUBLIC_URL + "static/js/bundle.js" }></script> */}
        {/* <script type="module">{ require('./dist/static/js/bundle') }</script> */}
      </body>
    </html>
  );
};

type ParsedRequest = Readonly<
  Pick<
    Http.IncomingMessage,
    "method" | "statusCode" | "statusMessage" | "url" | "headers"
  >
>;

const parseRequest = (request: Http.IncomingMessage): ParsedRequest => {
  return JSON.parse(
    JSON.stringify({
      method: request.method,
      statusCode: request.statusCode,
      statusMessage: request.statusMessage,
      url: request.url,
      headers: request.headers,
    } as const satisfies ParsedRequest)
  );
};

type ParsedResponse = Readonly<
  Pick<
    Http.ServerResponse<Http.IncomingMessage>,
    "statusCode" | "statusMessage"
  > & { req: ParsedRequest }
>;

const parseResponse = (
  response: Http.ServerResponse<Http.IncomingMessage>
): ParsedResponse => {
  return JSON.parse(
    JSON.stringify({
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
      req: {
        method: response.req.method,
        statusCode: response.req.statusCode,
        statusMessage: response.req.statusMessage,
        url: response.req.url,
        headers: response.req.headers,
      } satisfies ParsedRequest,
    } as const satisfies ParsedResponse)
  );
};

// run...
export = ((proc: NodeJS.Process) => {
  // safety first...
  proc.on("unhandledRejection", (err) => {
    throw err;
  });
  //
  proc.loadEnvFile();
  if (proc.env["NODE_ENV"] === undefined) throw new Error();
  //
  const PORT = parseInt(proc.env["PORT"] || "") || 3000;
  const HOST = proc.env["HOST"] || "0.0.0.0";
  const console = new nodeConsole.Console({
    stderr: proc.stderr,
    stdout: proc.stdout,
  });

  // Create an HTTP tunneling proxy
  const server: Http.Server<
    typeof Http.IncomingMessage,
    typeof Http.ServerResponse
  > = http.createServer();

  // Listen to the request event
  server.on("request", (request, response) => {
    // Render 'App' to a prettier-html-formatted string on every request
    prettier
      .format(
        Server.renderToString(
          // 'App' component
          <React.StrictMode>
            <App env={"production"} />
          </React.StrictMode>
        ),
        {
          // prettier options
          parser: "html",
        }
      )
      .then((app) => {
        // Write the response header
        response.writeHead(200, {
          "Content-Type": "text/html",
          "Content-Length": buffer.Buffer.byteLength(app),
        });
        // Write the 'App' string to the response
        response.end(app);
        return app;
      })
      .then((log) => {
        // Logger
        console.log(
          JSON.parse(
            JSON.stringify({
              ip: response.socket && response.socket.remoteAddress,
              port: response.socket && response.socket.remotePort,
              request: parseRequest(request),
              response: parseResponse(response),
            })
          )
        );
        return log;
      })
      .catch((err) => {
        // Errors
        const msg = Server.renderToStaticMarkup(
          <html>
            <head>
              <title>Error 500</title>
            </head>
            <body>
              <main>
                <p>Error:</p>
                <pre>
                  <code>{JSON.stringify(err)}</code>
                </pre>
              </main>
            </body>
          </html>
        );
        response.writeHead(500, {
          "Content-Type": "text/html",
          "Content-Length": buffer.Buffer.byteLength(msg),
        });
        // Write a simple static 'Error' page string to the response
        response.end(msg);
        return;
      });
  });

  // Listen to clientSocket requests
  server.on("connect", (req, clientSocket, head) => {
    // Connect to an origin server
    const { port, hostname } = new URL(
      `http://${proc.env["HOST"] ?? "localhost"}${req.url}`
    );
    const serverSocket = nodeNet.connect(parseInt(port) || 80, hostname, () => {
      clientSocket.write(
        "HTTP/1.1 200 Connection Established\r\n" +
          "Proxy-agent: Node.js-Proxy\r\n" +
          "\r\n"
      );
      serverSocket.write(head);
      serverSocket.pipe(clientSocket);
      clientSocket.pipe(serverSocket);
    });
  });

  // Listen for clientErrors
  server.on("clientError", (err, clientSocket) => {
    if (err.code === "ECONNRESET" || !clientSocket.writable) {
      return;
    }
    clientSocket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  });

  // Listen for server errors
  server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      console.error("Address in use, retrying...");
      setTimeout(() => {
        server.close();
        server.listen(PORT, HOST);
      }, 1000);
    }
  });

  // Now that proxy is running
  server.listen(PORT, HOST);

  // Server has a 5 seconds keep-alive timeout by default
  setInterval(() => {
    // Adapting a keep-alive agent
    http.request(
      {
        host: HOST,
        port: PORT,
        // method: 'CONNECT'
      },
      (res) => {
        const { statusCode } = res;
        const contentType = res.headers["content-type"] || "";

        let error;
        // Any 2xx status code signals a successful response but
        // here we're only checking for 200.
        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(
            "Invalid content-type.\n" +
              `Expected application/json but received ${contentType}`
          );
        }
        if (error) {
          console.error(error.message);
          // Consume response data to free up memory
          res.resume();
          return;
        }

        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
          } catch (e) {
            console.error({ error: e as Error }.error.message);
          }
        });
      }
    );
  }, 5000); // Sending request on 5s interval so it's easy to hit idle timeout

  // Close idle connections to the server after 10 seconds
  setTimeout(() => {
    // Closes idle connections, such as keep-alive connections. Server will close
    // once remaining active connections are terminated
    server.closeIdleConnections();
  }, 10000);
  //
})(global.process);
