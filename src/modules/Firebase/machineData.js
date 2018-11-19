import map from 'lodash/fp/map';
import { dbMachineData, currentTimestamp } from './config';

export const createEntryDB = async entry => {
  try {
    const addDoc = await dbMachineData.add({ ...entry, created: currentTimestamp() });
    return { ...entry, id: addDoc.id };
  } catch (error) {
    console.log('error creating entry of machine data from Firebase', error);
    return null;
  }
};

export const getMachineDataByIdDB = async id => {
  let entryFound = null;
  try {
    const document = await dbMachineData.doc(id).get();
    if (document.exists) {
      entryFound = document.data();
    }
  } catch (error) {
    console.log('error reading entry of machine data from Firebase', error);
  }
  return entryFound;
};

export const getMachineDataDB = async () => {
  let entries = null;
  try {
    const entriesDocument = await dbMachineData.orderBy('name').get();
    entries = map(entryDoc => ({ ...entryDoc.data(), id: entryDoc.id }))(entriesDocument.docs);
  } catch (error) {
    console.log('error reading entry of machine data from Firebase', error);
  }
  return entries;
};

export const updateMachineDataByIdDB = async entry => {
  const updatedEntry = {
    ...entry,
    updated: currentTimestamp(),
  };

  try {
    await dbMachineData.doc(entry.id).update(updatedEntry);
    return updatedEntry;
  } catch (error) {
    console.log('error updating entry of machine data from Firebase', error);
    return null;
  }
};

export const deleteMachineDataByIdDB = async id => {
  let success = false;

  try {
    await dbMachineData.doc(id).delete();
    success = true;
  } catch (error) {
    console.log('error removing entry of machine data from Firebase', error);
  }

  return success;
};
