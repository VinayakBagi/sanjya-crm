const mapping = {
  "crm-activity": {
    activity_id: "External_Key",
    subject: "Subject",
    start_date: "Start_DateTime",
    end_date: "End_Date_Time",
    owner_party_id: "Owner_ID",
    main_account_party_id: "Main_Account_ID",
    appointment_category: "Category",
    disposition_code: "Disposition_Code",
    brand: "Brand",
    customer_group: "Customer_Group",
    ranking: "Ranking",
    activity_status: "Status",
    priority: "Priority",
    sales_organization: "Sales_Organization",
    distribution_channel: "Distribution_Channel",
    division: "Division",
    document_type: "Document_Type",
    initiator_code: "Direction",
    customer_timezone: "Customer_Timezone",
    notes: "Notes",
  },
  contact: {
    bp_id: "Contact_ID",
    first_name: "First_Name",
    last_name: "Last_Name",
    middle_name: "Middle_Name",
    native_language: "Language",
    job_title: "Job_Title",
    web_registered: "Web_Registered",
    emails_opt_in: "Emails_Opt_In",
    sms_promotions_opt_in: "SMS_Promotions_Opt_In",
    print_marketing_opt_in: "Print_Marketing_Opt_In",
    contact_person_department_name: "Department_Text",
    contact_person_department: "Department",
    contact_person_vip_type: "VIP_Contact",
    email_address: "EMail",
    fax_number: "Fax",
    phone_number: "Phone",
    mobile: "Mobile",
    buying_guide_opt_in: "Buying_Guide_Opt_In",
    admin_user: "Admin_User",
    last_login: "Last_Login",
    web_user_id: "Web_User_ID",
    approver: "Approver",
    punch_out_user: "PunchOut_User",
    bp_company_id: "Account_ID",
    is_marked_for_archiving: "Status",
    country: "CountryRegion",
  },
  "business-partner": {
    bp_id: "Account_ID",
    role: "Role",
    conference_room: "Conference_Room", // Yes/No
    date_opened: "Date_Opened",
    fitness_center_gym: "Fitness_Center_Gym", // Yes/No
    language: "Native_Language", // EN/HI
    pool: "Pool", // Yes/No
    purchasing_control: "Purchasing_Control", // Z001
    renovation_date: "Renovation_Date",
    restaurant: "Restaurant", // Yes/No
    seasonal_close_date: "Seasonal_Close_Date", // January
    seasonal_open_date: "Seasonal_Open_Date", // January
  },
};

const mapRecordFields = (record: { [key: string]: any }, modelName: string) => {
  const modelMapping = mapping[modelName];
  console.log(record);
  console.log(modelMapping);
  if (!modelMapping) return record;
  const mappedRecord: any = {};
  Object.entries(modelMapping).forEach(
    ([attrKey, csvKey]: [string, string]) => {
      console.log(attrKey, csvKey);
      mappedRecord[attrKey] = record[csvKey] ?? "";
    }
  );
  console.log(mappedRecord);
  return mappedRecord;
};

export { mapRecordFields };
