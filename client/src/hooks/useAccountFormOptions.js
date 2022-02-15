import { useState } from "react";
import { useEffect } from "react";
import { metaInfoService } from "../services/metaInfoService";

export const useAccountFormOptions = () => {
  const [depositTypes, setDepositTypes] = useState([]);
  const [currencyTypes, setCurrencyTypes] = useState([]);

  useEffect(() => {
    async function getMetaInfo() {
      const accountTypes = await metaInfoService.getAccountTypes();
      const currencyTypes = await metaInfoService.getCurrencyTypes();
      setDepositTypes(accountTypes.data.accountTypes);
      setCurrencyTypes(currencyTypes.data.accountCurrencies);
    }
    getMetaInfo();
  }, []);

  const depositOptions = depositTypes.map((x) => ({
    label: x.TypeName,
    value: x.TypeName,
  }));

  const currencyOptions = currencyTypes.map((x) => ({
    label: x.TypeName,
    value: x.TypeName,
  }));

  const success = depositOptions.length;

  return { depositOptions, success, currencyOptions };
};
