import { getMyLocation } from "./locate";
import type { LocationType } from "./locate";
import { decrypt, encrypt, encryptObject } from "./encrypt";

export type SenderPayload = {
  id?: number;
  note: string;
  geo: boolean;
  key: string;
  v: "n5" | "n6" | "dn6" | string;
  server: string;
};

export type EncryptedSenderPayloadType = {
  id: string;
  str: string;
}

export const isValidPayload = (payload: SenderPayload): boolean => {
  try {
    let valid =
      payload.note.length > 0 &&
      payload.key.length > 6 &&
      payload.v !== undefined;
    return valid;
  } catch (e) {
    return false;
  }
};

export const getTrackURL = (payload:SenderPayload, key:string):string => {
  if(!key) throw new Error('Missing passcode');
  const ekey = encryptObject(payload,key);
  return `${window.location.origin}/etrack/?k=${ekey}`;
}


export const encodePayload = (payload:SenderPayload):string=>{
  const str = JSON.stringify(payload);
  return btoa(str);
}

export const decodePayload = (str:string):SenderPayload => {
  let buff = atob(str);
  return JSON.parse(buff);
}

export const encodePayloadEncrypted = (payload:SenderPayload, key:string):string=>{
  const str = JSON.stringify(payload);
  return btoa(encrypt(str, key));
}

export const decodePayloadEncrypted = (_str:string, key:string):SenderPayload => {
  let str = decrypt(_str, key);
  let buff = atob(str);
  return JSON.parse(buff);
}

export const sendToNomieAPI = async (
  payload: SenderPayload,
  onChange:(change:string)=>void
): Promise<boolean> => {
  let fireChange = onChange ? onChange : (c)=>{}
  let url: string;
  let npayload: any = { source: "irl", note: payload.note };
  let location: void | LocationType;
  

  try {
    if (payload.geo) {
      fireChange('locating');
      location = await getMyLocation().catch(e=>{
        console.log("Couldn't get location");
      })
    }
    if (location) {
      npayload.lat = location.lat;
      npayload.lng = location.lng;
    }
  } catch(e) {
    console.error("Could not get location, send it anyway");
  }

  if (payload.server != ""){
    url = payload.server
    npayload.api_key = payload.key;
  }
  else{
  if (payload.v == "n5") {
    url = "https://nomieapi.com/log";
    npayload.api_key = payload.key;
  } else if (payload.v == "n6"){
    url = "https://v6-dev.nomie.app/api/capture";
    npayload.key = payload.key;
  } else {
    url = "https://api.dailynomie.com/log/";
    npayload.api_key = payload.key;
  }}
  console.log(url)
  console.log(npayload);
  fireChange('sending');
  const call = await fetch(url, {
    method: "POST",
    mode: 'cors',
    body: JSON.stringify(npayload),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    
  });
  if(call.status !== 200) {
    fireChange('error');
    throw new Error(call.statusText);
    
  } else {
    const res = await call.json();
    console.log(res);
    if(res.success == false) {
      fireChange('error');
      throw new Error('Unable to validate that API key')
    } else {
      fireChange('done');
      return true;
    }
  
  }
  
};
