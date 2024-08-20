import * as esbuild from "esbuild";

/**
 * Accepts a {@link esbuild.Message Message} and returns an {@link Error}.
 * @param {esbuild.Message} message see {@link esbuild.Message}
 * @returns {Error}
 */
const convertMessageToError: (message: esbuild.Message) => Error = (
  message: esbuild.Message
): Error => {
  return new Error(message.text, { cause: message });
};

/**
 * Accepts an {@link Error} and returns a {@link esbuild.Message Message}.
 * @param {Error} error see {@link Error}
 * @returns {esbuild.Message}
 */
const convertErrorToMessage: (error: Error) => esbuild.Message = (
  error: Error
): esbuild.Message => {
  return {
    text: error.message || "",
    detail: error,
  } as esbuild.Message;
};

/**
 * Accepts a {@link esbuild.Message Message} and returns an {@link Error}.
 * @param {esbuild.Message[]} messages see {@link esbuild.Message Message}
 * @returns {Error[]}
 */
const convertMessagesToErrors: (messages: esbuild.Message[]) => Error[] = (
  messages: esbuild.Message[]
): Error[] => {
  return messages.map(convertMessageToError);
};

/**
 *
 * @param {Errors[]} errors
 * @returns {esbuild.Message[]}
 */
const convertErrorsToMessages: (errors: Error[]) => esbuild.Message[] = (
  errors: Error[]
) => {
  return errors.map(convertErrorToMessage);
};

export default {
  convertMessageToError,
  convertErrorToMessage,
  convertMessagesToErrors,
  convertErrorsToMessages,
};
