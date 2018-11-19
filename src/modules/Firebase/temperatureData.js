import map from 'lodash/fp/map';
import { dbTemperatureData as DB, currentTimestamp } from './config';

const dbName = 'temperature';

export const createEntryDB = async entry => {
  try {
    const addDoc = await DB.add({ ...entry, created: currentTimestamp() });
    return { ...entry, id: addDoc.id };
  } catch (error) {
    console.log(`error creating entry of ${dbName} data from Firebase: ${error}`);
    return null;
  }
};

export const getDataByIdDB = async id => {
  let entryFound = null;
  try {
    const document = await DB.doc(id).get();
    if (document.exists) {
      entryFound = document.data();
    }
  } catch (error) {
    console.log(`error reading entry of ${dbName} data from Firebase: ${error}`);
  }
  return entryFound;
};

export const getDataDB = async () => {
  let entries = null;
  try {
    const entriesDocument = await DB.orderBy('date')
      .orderBy('name')
      .get();
    entries = map(entryDoc => ({ ...entryDoc.data(), id: entryDoc.id }))(entriesDocument.docs);
  } catch (error) {
    console.log(`error reading entries of ${dbName} data from Firebase: ${error}`);
  }
  return entries;
};

export const updateDataByIdDB = async entry => {
  const updatedEntry = {
    ...entry,
    updated: currentTimestamp(),
  };

  try {
    await DB.doc(entry.id).update(updatedEntry);
    return updatedEntry;
  } catch (error) {
    console.log(`error updating entry of ${dbName} data from Firebase: ${error}`);
    return null;
  }
};

export const deleteDataByIdDB = async id => {
  let success = false;

  try {
    await DB.doc(id).delete();
    success = true;
  } catch (error) {
    console.log(`error removing entry of ${dbName} data from Firebase: ${error}`);
  }

  return success;
};
