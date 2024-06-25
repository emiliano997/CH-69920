export function getService(serviceName, serviceType) {
  const service = require(`./${serviceType}/${serviceName}.service.js`);
  return service;
}
