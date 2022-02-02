import { useState } from "react";
import { useEffect } from "react";
import { metaInfoService } from "../services/metaInfoService";

export const useFormOptions = () => {
  const [cities, setCities] = useState([]);
  const [citizenships, setCitizenships] = useState([]);
  const [disabilities, setDisabilities] = useState([]);

  useEffect(() => {
    async function getMetaInfo() {
      const cities = await metaInfoService.getCities();
      const citizenships = await metaInfoService.getCitizenships();
      const disabilities = await metaInfoService.getDisabilities();
      setCities(cities.data.cities);
      setCitizenships(citizenships.data.citizenships);
      setDisabilities(disabilities.data.disabilities);
    }
    getMetaInfo();
  }, []);
  const citiesOptions = cities.map((city) => ({ name: city.TypeName }));
  const disabilitiesOptions = disabilities.map((city) => ({
    name: city.TypeName,
  }));
  const citizenshipsOptions = citizenships.map((city) => ({
    name: city.TypeName,
  }));

  const success =
    citiesOptions.length &&
    disabilitiesOptions.length &&
    citizenshipsOptions.length;

  return { citiesOptions, disabilitiesOptions, citizenshipsOptions, success };
};
