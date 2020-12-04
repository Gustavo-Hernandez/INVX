import React, { useEffect, useContext } from "react";
import { firestore } from "../api/firebase";
import { Context as ItemsContext } from "../context/ItemsContext";
import { Context as LogsContext } from "../context/LogsContext";


const FirebaseListener = ({ children }) => {
  const {
    state: { folders, items },
    setFolders,
    setItems,
  } = useContext(ItemsContext);

  const {
    state: { logs},
    setLogs,
  } = useContext(LogsContext);

  //Folder Subscriber
  useEffect(() => {
    const folderSubscriber = firestore
      .collection("folders")
      .onSnapshot((snap) => {
        let updatedFolders = folders;
        snap.docChanges().forEach((change) => {
          switch (change.type) {
            case "added":
              updatedFolders.push({ ...change.doc.data(), id: change.doc.id });
              break;
            case "modified":
              updatedFolders.forEach((folder, i) => {
                if (folder.id === change.doc.id) {
                  updatedFolders[i] = change.doc.data();
                  updatedFolders[i].id = change.doc.id;
                }
              });
              break;
            case "removed":
              updatedFolders = updatedFolders.filter((folder) => {
                return folder.id !== change.doc.id;
              });
              break;
            default:
              break;
          }
        });
        setFolders(updatedFolders);
      });
    return () => {
      folderSubscriber();
    };
    // eslint-disable-next-line
  }, []);

  //Items Subscriber
  useEffect(() => {
    const itemsSubscriber = firestore.collection("items").onSnapshot((snap) => {
      let updatedItems = items;
      snap.docChanges().forEach((change) => {
        switch (change.type) {
          case "added":
            if (change.doc.data().visible) {
              updatedItems.push({ ...change.doc.data(), id: change.doc.id });
            }
            break;
          case "modified":
            updatedItems.forEach((item, i) => {
              if (item.id === change.doc.id) {
                updatedItems[i] = change.doc.data();
                updatedItems[i].id = change.doc.id;
              }
            });
            updatedItems = updatedItems.filter((item) => {
              return item.visible !== false;
            });
            break;
          case "removed":
            updatedItems = updatedItems.filter((item) => {
              return item.id !== change.doc.id;
            });
            break;
          default:
            break;
        }
      });
      setItems(updatedItems);
    });
    return () => {
      itemsSubscriber();
    };
    // eslint-disable-next-line
  }, []);

  //Logs Subscriber
  useEffect(() => {
    const logsSubscriber = firestore.collection("logs").onSnapshot((snap) => {
      let updatedLogs = logs;
      snap.docChanges().forEach((change) => {
        switch (change.type) {
          case "added":
            let data = change.doc.data();
            let tempDate = data.date.toDate();
            data.date = `${tempDate.toDateString()} ${tempDate.toLocaleTimeString()}`
            updatedLogs.push({ ...data, id: change.doc.id});
            break;
          case "modified":
            updatedLogs.forEach((item, i) => {
              if (item.id === change.doc.id) {
                let data = change.doc.data();
                let tempDate = data.date.toDate();
                data.date = `${tempDate.toDateString()} ${tempDate.toLocaleTimeString()}`
                updatedLogs[i] = data;
                updatedLogs[i].id = change.doc.id;
              }
            });
            break;
          case "removed":
            updatedLogs = updatedLogs.filter((item) => {
              return item.id !== change.doc.id;
            });
            break;
          default:
            break;
        }
      });
      setLogs(updatedLogs);
    });
    return () => {
      logsSubscriber();
    };
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
};
export default FirebaseListener;
