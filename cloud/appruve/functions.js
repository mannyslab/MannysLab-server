const { verifyDriverLicense, verifyId } =require("./appruve");

Parse.Cloud.define('verifyId', async request => {
  try {
    const { type, id, is_new_id } = request.params;
    const results = await verifyId({ type, id, is_new_id });
    return results;
  } catch (error) {
    throw error;
  }
});