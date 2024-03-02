const LOC_CACHE_KEY = "loc-cache";

export type LocationType = {
  time: Date;
  lat: number;
  lng: number;
};

export const getMyLocation = async (): Promise<LocationType> => {
  let getRealLocation = () => {
    return new Promise((resolve, reject) => {
      try {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            let payload = {
              time: new Date().getTime(),
              latitude: pos.coords.latitude,
              lat: pos.coords.latitude,
              longitude: pos.coords.longitude,
              lng: pos.coords.longitude,
            };
            localStorage.setItem(LOC_CACHE_KEY, JSON.stringify(payload));
            resolve(payload);
          },
          (e) => {
            // console.error(e);
            reject(e);
          },
          {
            timeout: 6000,
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  };

  return new Promise((resolve, reject) => {
    let cachedRaw = JSON.parse(localStorage.getItem(LOC_CACHE_KEY) || "null");

    try {
      if (cachedRaw) {
        if (new Date().getTime() - cachedRaw.time < 1000 * 60 * 2) {
          resolve({
            time: cachedRaw.time,
            lat: cachedRaw.latitude,
            lng: cachedRaw.longitude,
          });
        } else {
          if (!navigator.geolocation) {
            reject({ message: "No geolocation service found" });
          } else {
            getRealLocation().then(resolve).catch(reject);
          } // end if have geo lookup
        } // end if cache exists
      } else {
        getRealLocation().then(resolve).catch(reject);
      }
    } catch (e) {
      reject(e);
    }
  });
};
