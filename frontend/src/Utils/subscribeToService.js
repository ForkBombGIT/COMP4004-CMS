import { Client } from "Server";

const subscribeToService = (
  listenedServices,
  dataService,
  transformFunction,
  query,
  setData
) => {
  const setServiceData = () => {
    Client.service(dataService)
      .find(query)
      .then((data) => {
        setData(transformFunction(data));
      });
  };

  listenedServices.forEach((listenedService) => {
    ["created", "updated", "patched", "removed"].forEach((event) => {
      Client.service(listenedService).on(event, setServiceData);
    });
  });
};

export default subscribeToService;
