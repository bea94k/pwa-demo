// this uses the callback syntax, however, we encourage you to try the async/await syntax shown in async-dadjoke.js
export function handler(event, context, callback) {
    console.log('queryStringParameters', event.queryStringParameters)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello world' }),
    })
  }

  // "CRA's default service worker does not work with lambda functions out of the box. It prevents calling the function and returns the app itself instead
  // To solve this you have to eject and enhance the service worker configuration in the webpack config. Whitelist the path of your lambda function and you are good to go."
  // https://github.com/netlify/create-react-app-lambda 