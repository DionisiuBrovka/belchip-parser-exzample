const { taskParseAllDeviceTypes } = require('./tasks/task_parse_all_device_types.js')
const { taskParseAllDeviceSubTypes } = require('./tasks/task_parse_all_device_subtypes.js')

await taskParseAllDeviceTypes();
await taskParseAllDeviceSubTypes();
// await taskParseAllDeviceLinks();
// await taskMinimazeDeviceCount();
// await taskParseAllDevice();
// await taskCombineJSONData();