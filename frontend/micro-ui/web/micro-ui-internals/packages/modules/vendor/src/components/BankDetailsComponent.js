import React, { useEffect, useState } from "react";
import { TextInput, CardLabel } from "@djb25/digit-ui-react-components";

const BankDetailsComponent = ({ t, config, onSelect, userType, formData, ...props }) => {
  const [ifsc, setIfsc] = useState(formData?.ifscCode || "");
  const [bankName, setBankName] = useState(formData?.bankName || "");
  const [branchName, setBranchName] = useState(formData?.branchName || "");
  const [accountNumber, setAccountNumber] = useState(formData?.accountNumber || "");
  const [showToast, setShowToast] = useState(null);

  useEffect(() => {
    if (ifsc.length === 11) {
      fetch(`https://ifsc.razorpay.com/${ifsc}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.BANK && data.BRANCH) {
            setBankName(data.BANK);
            setBranchName(data.BRANCH);
            if (typeof onSelect === 'function') {
              onSelect(config.key, { bankName: data.BANK, branchName: data.BRANCH, ifscCode: ifsc, accountNumber: accountNumber });
            }
            setShowToast({ error: false, label: t("VALID_IFSC_CODE") });
          } else {
            setShowToast({ error: true, label: t("INVALID_IFSC_CODE") });
          }
        })
        .catch(() => {
          setShowToast({ error: true, label: t("INVALID_IFSC_CODE") });
        });
    }
  }, [ifsc]);

  useEffect(() => {
    if (typeof onSelect === 'function') {
      onSelect(config.key, { bankName, branchName, ifscCode: ifsc, accountNumber });
    }
  }, [accountNumber, bankName, branchName, ifsc]);

  const handleIfscChange = (e) => {
    const input = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    if (input.length <= 11) {
      setIfsc(input);
    }
  };

  return (
    <React.Fragment>
      <CardLabel>{t("ES_FSM_REGISTRY_IFSC_CODE")}</CardLabel>
      <TextInput
        t={t}
        type={"text"}
        isMandatory={false}
        name="ifscCode"
        value={ifsc}
        onChange={handleIfscChange}
        style={{ width: "100%" }}
        maxLength={11}
      />
      <CardLabel>{t("ES_FSM_REGISTRY_ACCOUNT_NUMBER")}</CardLabel>
      <TextInput
        t={t}
        type={"text"}
        isMandatory={false}
        name="accountNumber"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        style={{ width: "100%" }}
      />



      <CardLabel>{t("ES_FSM_REGISTRY_BANK_NAME")}</CardLabel>
      <TextInput
        t={t}
        type={"text"}
        isMandatory={false}
        name="bankName"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
        disabled={ifsc.length === 11 && bankName}
        style={{ width: "100%" }}
      />

      <CardLabel>{t("ES_FSM_REGISTRY_BRANCH_NAME")}</CardLabel>
      <TextInput
        t={t}
        type={"text"}
        isMandatory={false}
        name="branchName"
        value={branchName}
        onChange={(e) => setBranchName(e.target.value)}
        disabled={ifsc.length === 11 && branchName}
        style={{ width: "100%" }}
      />
    </React.Fragment>
  );
};

export default BankDetailsComponent;
