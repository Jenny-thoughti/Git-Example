
const helpers = {

  /**
   * Generate API Response JSON using parameters provided
   *
   * @param {object} res Response Object
   * @param {object} req Request Object
   * @param {string} msg Message|Error or Message or Error.
   * (general message, success message or error message. If want to send both message & error, use pipe separated string.). Default is empty string.
   * @param {number} code HTTP Status Code. Default is 400.
   * @param {string[]} result Response Payload. Default is empty array.
   *
   * @return {string} API Response in JSON format
   */
  generateApiResponse: async function(res, req, msg='', code = 400, result = []) {
    let success = false;
    let status = 'failure';
    let message = '';
    let error = '';

    if (msg == '' || msg.split('|').length <= 1) {
      message= msg;
      error=msg;
    } else {
      const messages = msg.split('|');
      message = messages[0];
      error = messages[1];
    }

    if (code == 200) {
      success = true;
      status = 'ok';
      error = '';
    }

    // eslint-disable-next-line no-return-await
    return await res.status(code).json({success, status, code, message, error, result});
  },
};

module.exports= helpers;

