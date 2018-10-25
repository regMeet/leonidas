import map from 'lodash/fp/map';
import { dbMachineData } from './config';

export const createEntryDB = async entry => {
  try {
    await dbMachineData.add(entry);
    return entry;
  } catch (error) {
    console.log('error creating entry of machine data from Firebase', error);
    return null;
  }
};

export const getEntryByIdDB = async id => {
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

export const getEntriesDB = async () => {
  let entries = null;
  try {
    const entriesDocument = await dbMachineData.get();
    entries = map(entryDoc => entryDoc.data())(entriesDocument.docs);
  } catch (error) {
    console.log('error reading entry of machine data from Firebase', error);
  }
  return entries;
};

export const updateEntryById = async (id, entry) => {
  let success = false;

  try {
    await dbMachineData.doc(id).update(entry);
    success = true;
    console.log('Document successfully updated!');
  } catch (error) {
    console.log('error updating entry of machine data from Firebase', error);
  }

  return success;
};

export const deleteEntryById = async id => {
  let success = false;

  try {
    await dbMachineData.doc(id).delete();
    success = true;
    console.log('Document successfully deleted!');
  } catch (error) {
    console.log('error removing entry of machine data from Firebase', error);
  }

  return success;
};
