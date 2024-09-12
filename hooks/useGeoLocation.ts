import { useCallback, useEffect, useState } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        requestPermission();
      }
    });
  }, []);

  const requestPermission = useCallback(() => {
    if (!navigator.geolocation)
      setError("Geolocation is not supported by your browser");

    setError(null);
    setIsFetching(true);
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocation(position);
        setIsFetching(false);
      },
      (error: GeolocationPositionError) => {
        setError(error.message);
        setIsFetching(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
      }
    );
  }, []);

  return { location, isFetching, error, requestPermission };
};

export default useGeoLocation;
