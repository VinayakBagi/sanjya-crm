import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminAuditLog extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_audit_logs';
  info: {
    displayName: 'Audit Log';
    pluralName: 'audit-logs';
    singularName: 'audit-log';
  };
  options: {
    draftAndPublish: false;
    timestamps: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::audit-log'> &
      Schema.Attribute.Private;
    payload: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<'oneToOne', 'admin::user'>;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAboutAbout extends Struct.SingleTypeSchema {
  collectionName: 'abouts';
  info: {
    description: 'Write about yourself and the content you create';
    displayName: 'About';
    pluralName: 'abouts';
    singularName: 'about';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    blocks: Schema.Attribute.DynamicZone<
      ['shared.media', 'shared.quote', 'shared.rich-text', 'shared.slider']
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::about.about'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiArticleArticle extends Struct.CollectionTypeSchema {
  collectionName: 'articles';
  info: {
    description: 'Create your blog content';
    displayName: 'Article';
    pluralName: 'articles';
    singularName: 'article';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    author: Schema.Attribute.Relation<'manyToOne', 'api::author.author'>;
    blocks: Schema.Attribute.DynamicZone<
      ['shared.media', 'shared.quote', 'shared.rich-text', 'shared.slider']
    >;
    category: Schema.Attribute.Relation<'manyToOne', 'api::category.category'>;
    cover: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 80;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article.article'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'title'>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAuthorAuthor extends Struct.CollectionTypeSchema {
  collectionName: 'authors';
  info: {
    description: 'Create authors for your content';
    displayName: 'Author';
    pluralName: 'authors';
    singularName: 'author';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::author.author'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBpAddrDepdntIntlLocNumberBpAddrDepdntIntlLocNumber
  extends Struct.CollectionTypeSchema {
  collectionName: 'bp_addr_depdnt_intl_loc_numbers';
  info: {
    displayName: 'Business Partner Address-Dependent International Location Number (ILN)';
    pluralName: 'bp-addr-depdnt-intl-loc-numbers';
    singularName: 'bp-addr-depdnt-intl-loc-number';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    bp_address_id: Schema.Attribute.String & Schema.Attribute.Required;
    bp_id: Schema.Attribute.String & Schema.Attribute.Required;
    business_partner: Schema.Attribute.Relation<
      'oneToOne',
      'api::business-partner.business-partner'
    >;
    business_partner_address: Schema.Attribute.Relation<
      'oneToOne',
      'api::business-partner-address.business-partner-address'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    international_location_number_1: Schema.Attribute.String;
    international_location_number_2: Schema.Attribute.String;
    international_location_number_3: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-addr-depdnt-intl-loc-number.bp-addr-depdnt-intl-loc-number'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBpAddressUsageBpAddressUsage
  extends Struct.CollectionTypeSchema {
  collectionName: 'bp_address_usages';
  info: {
    displayName: 'Business Partner Address Usage';
    pluralName: 'bp-address-usages';
    singularName: 'bp-address-usage';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    address_usage: Schema.Attribute.String & Schema.Attribute.Required;
    authorization_group: Schema.Attribute.String;
    bp_address_id: Schema.Attribute.String & Schema.Attribute.Required;
    bp_id: Schema.Attribute.String & Schema.Attribute.Required;
    business_partner: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    business_partner_address: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner-address.business-partner-address'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-address-usage.bp-address-usage'
    >;
    publishedAt: Schema.Attribute.DateTime;
    standard_usage: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    validity_end_date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    validity_start_date: Schema.Attribute.DateTime;
  };
}

export interface ApiBpContactToAddressBpContactToAddress
  extends Struct.CollectionTypeSchema {
  collectionName: 'bp_contact_to_addresses';
  info: {
    displayName: 'Business Partner Contact To Address';
    pluralName: 'bp-contact-to-addresses';
    singularName: 'bp-contact-to-address';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    additional_street_prefix_name: Schema.Attribute.String;
    additional_street_suffix_name: Schema.Attribute.String;
    address_number: Schema.Attribute.String;
    address_representation_code: Schema.Attribute.String;
    address_time_zone: Schema.Attribute.String;
    bp_company_id: Schema.Attribute.String & Schema.Attribute.Required;
    bp_contact_address_id: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    bp_person_id: Schema.Attribute.String & Schema.Attribute.Required;
    business_partner_company: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    business_partner_person: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    care_of_name: Schema.Attribute.String;
    city_code: Schema.Attribute.String;
    city_name: Schema.Attribute.String;
    company_postal_code: Schema.Attribute.String;
    contact_company_address: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner-contact.business-partner-contact'
    >;
    contact_person_address: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner-contact.business-partner-contact'
    >;
    contact_person_building: Schema.Attribute.String;
    contact_person_prfrd_comm_medium: Schema.Attribute.String;
    contact_relationship_department: Schema.Attribute.String;
    contact_relationship_function: Schema.Attribute.String;
    correspondence_short_name: Schema.Attribute.String;
    country: Schema.Attribute.String;
    county: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    delivery_service_number: Schema.Attribute.String;
    delivery_service_type_code: Schema.Attribute.String;
    district: Schema.Attribute.String;
    emails: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-email-address.bp-email-address'
    >;
    fax_numbers: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-fax-number.bp-fax-number'
    >;
    floor: Schema.Attribute.String;
    form_of_address: Schema.Attribute.String;
    full_name: Schema.Attribute.String;
    home_city_name: Schema.Attribute.String;
    home_page_urls: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-home-page-url.bp-home-page-url'
    >;
    house_number: Schema.Attribute.String;
    house_number_supplement_text: Schema.Attribute.String;
    inhouse_mail: Schema.Attribute.String;
    language: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-contact-to-address.bp-contact-to-address'
    >;
    person: Schema.Attribute.String;
    phone_numbers: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-phone-number.bp-phone-number'
    >;
    po_box: Schema.Attribute.String;
    po_box_deviating_city_name: Schema.Attribute.String;
    po_box_deviating_country: Schema.Attribute.String;
    po_box_deviating_region: Schema.Attribute.String;
    po_box_is_without_number: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    po_box_lobby_name: Schema.Attribute.String;
    po_box_postal_code: Schema.Attribute.String;
    postal_code: Schema.Attribute.String;
    prfrd_comm_medium_type: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    region: Schema.Attribute.String;
    relationship: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner-relationship.business-partner-relationship'
    >;
    relationship_number: Schema.Attribute.String & Schema.Attribute.Required;
    room_number: Schema.Attribute.String;
    street_name: Schema.Attribute.String;
    street_prefix_name: Schema.Attribute.String;
    street_suffix_name: Schema.Attribute.String;
    tax_jurisdiction: Schema.Attribute.String;
    transport_zone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    validity_end_date: Schema.Attribute.DateTime & Schema.Attribute.Required;
  };
}

export interface ApiBpContactToFuncAndDeptBpContactToFuncAndDept
  extends Struct.CollectionTypeSchema {
  collectionName: 'bp_contact_to_func_and_depts';
  info: {
    displayName: 'Business Partner Contact Person Function and Department';
    pluralName: 'bp-contact-to-func-and-depts';
    singularName: 'bp-contact-to-func-and-dept';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    bp_company_id: Schema.Attribute.String & Schema.Attribute.Required;
    bp_person_id: Schema.Attribute.String & Schema.Attribute.Required;
    business_partner_company: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    business_partner_person: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    contact_company: Schema.Attribute.Relation<
      'oneToOne',
      'api::business-partner-contact.business-partner-contact'
    >;
    contact_person: Schema.Attribute.Relation<
      'oneToOne',
      'api::business-partner-contact.business-partner-contact'
    >;
    contact_person_authority_type: Schema.Attribute.String;
    contact_person_department: Schema.Attribute.String;
    contact_person_department_name: Schema.Attribute.String;
    contact_person_function: Schema.Attribute.String;
    contact_person_function_name: Schema.Attribute.String;
    contact_person_remark_text: Schema.Attribute.String;
    contact_person_vip_type: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email_address: Schema.Attribute.String;
    fax_number: Schema.Attribute.String;
    fax_number_extension: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-contact-to-func-and-dept.bp-contact-to-func-and-dept'
    >;
    phone_number: Schema.Attribute.String;
    phone_number_extension: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    relationship: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner-relationship.business-partner-relationship'
    >;
    relationship_category: Schema.Attribute.String;
    relationship_number: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    validity_end_date: Schema.Attribute.DateTime & Schema.Attribute.Required;
  };
}

export interface ApiBpCreditWorthinessBpCreditWorthiness
  extends Struct.CollectionTypeSchema {
  collectionName: 'bp_credit_worthinesses';
  info: {
    displayName: 'Business Partner Credit Worthiness';
    pluralName: 'bp-credit-worthinesses';
    singularName: 'bp-credit-worthiness';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    bp_crdt_wrthnss_access_chk_is_active: Schema.Attribute.Boolean;
    bp_credit_standing_comment: Schema.Attribute.Text;
    bp_credit_standing_date: Schema.Attribute.DateTime;
    bp_credit_standing_rating: Schema.Attribute.String;
    bp_credit_standing_status: Schema.Attribute.String;
    bp_foreclosure_date: Schema.Attribute.DateTime;
    bp_foreclosure_is_initiated: Schema.Attribute.Boolean;
    bp_id: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    bp_legal_proceeding_status: Schema.Attribute.String;
    bp_lgl_proceeding_initiation_date: Schema.Attribute.DateTime;
    bus_part_credit_standing: Schema.Attribute.String;
    business_partner: Schema.Attribute.Relation<
      'oneToOne',
      'api::business-partner.business-partner'
    >;
    business_partner_bankruptcy_date: Schema.Attribute.DateTime;
    business_partner_is_bankrupt: Schema.Attribute.Boolean;
    business_partner_is_under_oath: Schema.Attribute.Boolean;
    business_partner_oath_date: Schema.Attribute.DateTime;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    credit_rating_agency: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-credit-worthiness.bp-credit-worthiness'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBpEmailAddressBpEmailAddress
  extends Struct.CollectionTypeSchema {
  collectionName: 'bp_email_addresses';
  info: {
    displayName: 'Business Partner Email Address';
    pluralName: 'bp-email-addresses';
    singularName: 'bp-email-address';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    address_communication_remark_text: Schema.Attribute.Text;
    address_id: Schema.Attribute.String & Schema.Attribute.Required;
    bp_contact_address: Schema.Attribute.Relation<
      'manyToOne',
      'api::bp-contact-to-address.bp-contact-to-address'
    >;
    business_partner_address: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner-address.business-partner-address'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email_address: Schema.Attribute.Email;
    is_default_email_address: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-email-address.bp-email-address'
    >;
    ordinal_number: Schema.Attribute.Integer & Schema.Attribute.Required;
    person: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    search_email_address: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBpFaxNumberBpFaxNumber extends Struct.CollectionTypeSchema {
  collectionName: 'bp_fax_numbers';
  info: {
    displayName: 'Business Partner Fax Number';
    pluralName: 'bp-fax-numbers';
    singularName: 'bp-fax-number';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    address_communication_remark_text: Schema.Attribute.Text;
    address_id: Schema.Attribute.String & Schema.Attribute.Required;
    bp_contact_address: Schema.Attribute.Relation<
      'manyToOne',
      'api::bp-contact-to-address.bp-contact-to-address'
    >;
    business_partner_address: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner-address.business-partner-address'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    fax_country: Schema.Attribute.String;
    fax_number: Schema.Attribute.String;
    fax_number_extension: Schema.Attribute.String;
    international_fax_number: Schema.Attribute.String;
    is_default_fax_number: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-fax-number.bp-fax-number'
    >;
    ordinal_number: Schema.Attribute.Integer & Schema.Attribute.Required;
    person: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBpHomePageUrlBpHomePageUrl
  extends Struct.CollectionTypeSchema {
  collectionName: 'bp_home_page_urls';
  info: {
    displayName: 'Business Partner Home Page URL';
    pluralName: 'bp-home-page-urls';
    singularName: 'bp-home-page-url';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    address_communication_remark_text: Schema.Attribute.Text;
    address_id: Schema.Attribute.String & Schema.Attribute.Required;
    bp_contact_address: Schema.Attribute.Relation<
      'manyToOne',
      'api::bp-contact-to-address.bp-contact-to-address'
    >;
    business_partner_address: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner-address.business-partner-address'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    is_default_url_address: Schema.Attribute.Boolean &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-home-page-url.bp-home-page-url'
    >;
    ordinal_number: Schema.Attribute.Integer & Schema.Attribute.Required;
    person: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    search_url_address: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url_field_length: Schema.Attribute.Integer;
    validity_start_date: Schema.Attribute.DateTime;
    website_url: Schema.Attribute.String;
  };
}

export interface ApiBpIntlAddressVersionBpIntlAddressVersion
  extends Struct.CollectionTypeSchema {
  collectionName: 'bp_intl_address_versions';
  info: {
    displayName: 'Business Partner International Address Version';
    pluralName: 'bp-intl-address-versions';
    singularName: 'bp-intl-address-version';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    address_id: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    address_id_by_external_system: Schema.Attribute.String;
    address_person_id: Schema.Attribute.String;
    address_representation_code: Schema.Attribute.String &
      Schema.Attribute.Required;
    address_search_term1: Schema.Attribute.String;
    address_search_term2: Schema.Attribute.String;
    address_time_zone: Schema.Attribute.String;
    addressee_full_name: Schema.Attribute.String;
    bp_id: Schema.Attribute.String & Schema.Attribute.Required;
    business_partner: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    care_of_name: Schema.Attribute.String;
    city_name: Schema.Attribute.String;
    city_number: Schema.Attribute.String;
    company_postal_code: Schema.Attribute.String;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    delivery_service_number: Schema.Attribute.String;
    delivery_service_type_code: Schema.Attribute.String;
    district_name: Schema.Attribute.String;
    form_of_address: Schema.Attribute.String;
    house_number: Schema.Attribute.String;
    house_number_supplement_text: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-intl-address-version.bp-intl-address-version'
    >;
    organization_name1: Schema.Attribute.String;
    organization_name2: Schema.Attribute.String;
    organization_name3: Schema.Attribute.String;
    organization_name4: Schema.Attribute.String;
    person_family_name: Schema.Attribute.String;
    person_given_name: Schema.Attribute.String;
    po_box: Schema.Attribute.String;
    po_box_deviating_city_name: Schema.Attribute.String;
    po_box_deviating_country: Schema.Attribute.String;
    po_box_deviating_region: Schema.Attribute.String;
    po_box_is_without_number: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    po_box_lobby_name: Schema.Attribute.String;
    po_box_postal_code: Schema.Attribute.String;
    postal_code: Schema.Attribute.String;
    prfrd_comm_medium_type: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    region: Schema.Attribute.String;
    secondary_region: Schema.Attribute.String;
    secondary_region_name: Schema.Attribute.String;
    street_name: Schema.Attribute.String;
    street_prefix_name1: Schema.Attribute.String;
    street_prefix_name2: Schema.Attribute.String;
    street_suffix_name1: Schema.Attribute.String;
    street_suffix_name2: Schema.Attribute.String;
    tax_jurisdiction: Schema.Attribute.String;
    tertiary_region: Schema.Attribute.String;
    tertiary_region_name: Schema.Attribute.String;
    transport_zone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    village_name: Schema.Attribute.String;
  };
}

export interface ApiBpMarketingAttributeBpMarketingAttribute
  extends Struct.CollectionTypeSchema {
  collectionName: 'bp_marketing_attributes';
  info: {
    displayName: 'Business Partner Marketing Attribute';
    pluralName: 'bp-marketing-attributes';
    singularName: 'bp-marketing-attribute';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    bp_id: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    business_partner: Schema.Attribute.Relation<
      'oneToOne',
      'api::business-partner.business-partner'
    >;
    conference_room: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date_opened: Schema.Attribute.Date;
    fitness_center: Schema.Attribute.String;
    gym: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-marketing-attribute.bp-marketing-attribute'
    >;
    pool: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    renovation_date: Schema.Attribute.Date;
    restaurant: Schema.Attribute.String;
    seasonal_close_date: Schema.Attribute.String;
    seasonal_open_date: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBpPhoneNumberBpPhoneNumber
  extends Struct.CollectionTypeSchema {
  collectionName: 'bp_phone_numbers';
  info: {
    displayName: 'Business Partner Phone Number';
    pluralName: 'bp-phone-numbers';
    singularName: 'bp-phone-number';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    address_communication_remark_text: Schema.Attribute.Text;
    address_id: Schema.Attribute.String & Schema.Attribute.Required;
    bp_contact_address: Schema.Attribute.Relation<
      'manyToOne',
      'api::bp-contact-to-address.bp-contact-to-address'
    >;
    business_partner_address: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner-address.business-partner-address'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    destination_location_country: Schema.Attribute.String;
    international_phone_number: Schema.Attribute.String;
    is_default_phone_number: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-phone-number.bp-phone-number'
    >;
    ordinal_number: Schema.Attribute.Integer & Schema.Attribute.Required;
    person: Schema.Attribute.String & Schema.Attribute.Required;
    phone_number: Schema.Attribute.String;
    phone_number_extension: Schema.Attribute.String;
    phone_number_type: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBusinessPartnerAddressBusinessPartnerAddress
  extends Struct.CollectionTypeSchema {
  collectionName: 'business_partner_addresses';
  info: {
    description: '';
    displayName: 'Business Partner Address';
    pluralName: 'business-partner-addresses';
    singularName: 'business-partner-address';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    additional_street_prefix_name: Schema.Attribute.String;
    additional_street_suffix_name: Schema.Attribute.String;
    address_id_by_external_system: Schema.Attribute.String;
    address_time_zone: Schema.Attribute.String;
    address_usages: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-address-usage.bp-address-usage'
    >;
    authorization_group: Schema.Attribute.String;
    bp_address_id: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    bp_id: Schema.Attribute.String & Schema.Attribute.Required;
    business_partner: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    care_of_name: Schema.Attribute.String;
    city_code: Schema.Attribute.String;
    city_name: Schema.Attribute.String;
    company_postal_code: Schema.Attribute.String;
    country: Schema.Attribute.String;
    county: Schema.Attribute.String;
    county_code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    delivery_service_number: Schema.Attribute.String;
    delivery_service_type_code: Schema.Attribute.String;
    district: Schema.Attribute.String;
    emails: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-email-address.bp-email-address'
    >;
    fax_numbers: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-fax-number.bp-fax-number'
    >;
    form_of_address: Schema.Attribute.String;
    full_name: Schema.Attribute.String;
    home_city_name: Schema.Attribute.String;
    home_page_urls: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-home-page-url.bp-home-page-url'
    >;
    house_number: Schema.Attribute.String;
    house_number_supplement_text: Schema.Attribute.String;
    intl_loc_number: Schema.Attribute.Relation<
      'oneToOne',
      'api::bp-addr-depdnt-intl-loc-number.bp-addr-depdnt-intl-loc-number'
    >;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-address.business-partner-address'
    >;
    phone_numbers: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-phone-number.bp-phone-number'
    >;
    po_box: Schema.Attribute.String;
    po_box_deviating_city_name: Schema.Attribute.String;
    po_box_deviating_country: Schema.Attribute.String;
    po_box_deviating_region: Schema.Attribute.String;
    po_box_is_without_number: Schema.Attribute.Boolean;
    po_box_lobby_name: Schema.Attribute.String;
    po_box_postal_code: Schema.Attribute.String;
    postal_code: Schema.Attribute.String;
    prfrd_comm_medium_type: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    region: Schema.Attribute.String;
    street_name: Schema.Attribute.String;
    township_code: Schema.Attribute.String;
    township_name: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    uuid: Schema.Attribute.String;
    validity_end_date: Schema.Attribute.DateTime;
    validity_start_date: Schema.Attribute.DateTime;
  };
}

export interface ApiBusinessPartnerBankBusinessPartnerBank
  extends Struct.CollectionTypeSchema {
  collectionName: 'business_partner_banks';
  info: {
    displayName: 'Business Partner Bank';
    pluralName: 'business-partner-banks';
    singularName: 'business-partner-bank';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    bank_account: Schema.Attribute.String;
    bank_account_holder_name: Schema.Attribute.String;
    bank_account_name: Schema.Attribute.String;
    bank_account_reference_text: Schema.Attribute.String;
    bank_control_key: Schema.Attribute.String;
    bank_country_key: Schema.Attribute.String;
    bank_identification: Schema.Attribute.String & Schema.Attribute.Required;
    bank_name: Schema.Attribute.String;
    bank_number: Schema.Attribute.String;
    bp_id: Schema.Attribute.String & Schema.Attribute.Required;
    business_partner: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    city_name: Schema.Attribute.String;
    collection_auth_ind: Schema.Attribute.Boolean;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    iban: Schema.Attribute.String;
    iban_validity_start_date: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-bank.business-partner-bank'
    >;
    publishedAt: Schema.Attribute.DateTime;
    swift_code: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    validity_end_date: Schema.Attribute.DateTime;
    validity_start_date: Schema.Attribute.DateTime;
  };
}

export interface ApiBusinessPartnerContactBusinessPartnerContact
  extends Struct.CollectionTypeSchema {
  collectionName: 'business_partner_contacts';
  info: {
    displayName: 'Business Partner Contact';
    pluralName: 'business-partner-contacts';
    singularName: 'business-partner-contact';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    bp_company_id: Schema.Attribute.String & Schema.Attribute.Required;
    bp_person_id: Schema.Attribute.String & Schema.Attribute.Required;
    business_partner_company: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    business_partner_person: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    company_addresses: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-contact-to-address.bp-contact-to-address'
    >;
    company_func_and_dept: Schema.Attribute.Relation<
      'oneToOne',
      'api::bp-contact-to-func-and-dept.bp-contact-to-func-and-dept'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    is_standard_relationship: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-contact.business-partner-contact'
    >;
    person_addresses: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-contact-to-address.bp-contact-to-address'
    >;
    person_func_and_dept: Schema.Attribute.Relation<
      'oneToOne',
      'api::bp-contact-to-func-and-dept.bp-contact-to-func-and-dept'
    >;
    publishedAt: Schema.Attribute.DateTime;
    relationship: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner-relationship.business-partner-relationship'
    >;
    relationship_category: Schema.Attribute.String;
    relationship_number: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    validity_end_date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    validity_start_date: Schema.Attribute.DateTime;
  };
}

export interface ApiBusinessPartnerExtensionBusinessPartnerExtension
  extends Struct.CollectionTypeSchema {
  collectionName: 'business_partner_extensions';
  info: {
    displayName: 'Business Partner Extension';
    pluralName: 'business-partner-extensions';
    singularName: 'business-partner-extension';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    admin_user: Schema.Attribute.Boolean;
    approver: Schema.Attribute.Boolean;
    best_reached_by: Schema.Attribute.String;
    bp_id: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    business_department: Schema.Attribute.String;
    business_partner: Schema.Attribute.Relation<
      'oneToOne',
      'api::business-partner.business-partner'
    >;
    buying_guide_opt_in: Schema.Attribute.Boolean;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email_optcode_chg_ind: Schema.Attribute.Boolean;
    emails_opt_in: Schema.Attribute.Boolean;
    hs_update_flag: Schema.Attribute.String;
    hubspot_chg_flag: Schema.Attribute.Boolean;
    job_title: Schema.Attribute.String;
    last_login: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-extension.business-partner-extension'
    >;
    native_language: Schema.Attribute.String;
    print_marketing_opt_in: Schema.Attribute.Boolean;
    publishedAt: Schema.Attribute.DateTime;
    punch_out_user: Schema.Attribute.Boolean;
    purchasing_control: Schema.Attribute.String;
    sms_promotions_opt_in: Schema.Attribute.Boolean;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    web_registered: Schema.Attribute.Boolean;
    web_user_id: Schema.Attribute.String;
  };
}

export interface ApiBusinessPartnerIdentificationBusinessPartnerIdentification
  extends Struct.CollectionTypeSchema {
  collectionName: 'business_partner_identifications';
  info: {
    displayName: 'Business Partner Identification';
    pluralName: 'business-partner-identifications';
    singularName: 'business-partner-identification';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    authorization_group: Schema.Attribute.String;
    bp_id: Schema.Attribute.String & Schema.Attribute.Required;
    bp_identification_entry_date: Schema.Attribute.DateTime;
    bp_identification_number: Schema.Attribute.String;
    bp_identification_type: Schema.Attribute.String;
    bp_idn_nmbr_issuing_institute: Schema.Attribute.String;
    business_partner: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-identification.business-partner-identification'
    >;
    publishedAt: Schema.Attribute.DateTime;
    region: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    validity_end_date: Schema.Attribute.DateTime;
    validity_start_date: Schema.Attribute.DateTime;
  };
}

export interface ApiBusinessPartnerPaymentCardBusinessPartnerPaymentCard
  extends Struct.CollectionTypeSchema {
  collectionName: 'business_partner_payment_cards';
  info: {
    displayName: 'Business Partner Payment Card';
    pluralName: 'business-partner-payment-cards';
    singularName: 'business-partner-payment-card';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    bp_id: Schema.Attribute.String & Schema.Attribute.Required;
    business_partner: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    card_description: Schema.Attribute.String;
    card_holder: Schema.Attribute.String;
    card_issue_date: Schema.Attribute.DateTime;
    card_issuing_bank: Schema.Attribute.String;
    card_number: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    is_standard_card: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-payment-card.business-partner-payment-card'
    >;
    masked_card_number: Schema.Attribute.String;
    payment_card_id: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    payment_card_lock: Schema.Attribute.String;
    payment_card_type: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    validity_date: Schema.Attribute.DateTime;
    validity_end_date: Schema.Attribute.DateTime;
  };
}

export interface ApiBusinessPartnerRelationshipBusinessPartnerRelationship
  extends Struct.CollectionTypeSchema {
  collectionName: 'business_partner_relationships';
  info: {
    displayName: 'Business Partner Relationship';
    pluralName: 'business-partner-relationships';
    singularName: 'business-partner-relationship';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    bp_contact_to_address_relationships: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-contact-to-address.bp-contact-to-address'
    >;
    bp_id1: Schema.Attribute.String & Schema.Attribute.Required;
    bp_id2: Schema.Attribute.String & Schema.Attribute.Required;
    bp_relationship_type: Schema.Attribute.String;
    business_partner1: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    business_partner2: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    contact_func_and_dept_relationships: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-contact-to-func-and-dept.bp-contact-to-func-and-dept'
    >;
    contact_relationships: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-contact.business-partner-contact'
    >;
    created_by_user: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    creation_date: Schema.Attribute.DateTime;
    creation_time: Schema.Attribute.DateTime;
    is_standard_relationship: Schema.Attribute.Boolean;
    last_change_date: Schema.Attribute.DateTime;
    last_change_time: Schema.Attribute.DateTime;
    last_changed_by_user: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-relationship.business-partner-relationship'
    >;
    publishedAt: Schema.Attribute.DateTime;
    relationship_category: Schema.Attribute.String;
    relationship_number: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    validity_end_date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    validity_start_date: Schema.Attribute.DateTime;
  };
}

export interface ApiBusinessPartnerRoleBusinessPartnerRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'business_partner_roles';
  info: {
    displayName: 'Business Partner Role';
    pluralName: 'business-partner-roles';
    singularName: 'business-partner-role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    authorization_group: Schema.Attribute.String;
    bp_id: Schema.Attribute.String & Schema.Attribute.Required;
    bp_role: Schema.Attribute.String & Schema.Attribute.Required;
    business_partner: Schema.Attribute.Relation<
      'manyToOne',
      'api::business-partner.business-partner'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-role.business-partner-role'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    valid_from: Schema.Attribute.DateTime;
    valid_to: Schema.Attribute.DateTime;
  };
}

export interface ApiBusinessPartnerBusinessPartner
  extends Struct.CollectionTypeSchema {
  collectionName: 'business_partners';
  info: {
    description: '';
    displayName: 'Business Partner';
    pluralName: 'business-partners';
    singularName: 'business-partner';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    address_usages: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-address-usage.bp-address-usage'
    >;
    addresses: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-address.business-partner-address'
    >;
    banks: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-bank.business-partner-bank'
    >;
    bp_category: Schema.Attribute.String;
    bp_data_controller_is_not_required: Schema.Attribute.Boolean;
    bp_extension: Schema.Attribute.Relation<
      'oneToOne',
      'api::business-partner-extension.business-partner-extension'
    >;
    bp_full_name: Schema.Attribute.String;
    bp_grouping: Schema.Attribute.String;
    bp_id: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    bp_intl_address_versions: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-intl-address-version.bp-intl-address-version'
    >;
    bp_uuid: Schema.Attribute.String;
    bus_part_marital_status: Schema.Attribute.String;
    bus_part_nationality: Schema.Attribute.String;
    business_partner_birth_name: Schema.Attribute.String;
    business_partner_id_by_ext_system: Schema.Attribute.String;
    business_partner_occupation: Schema.Attribute.String;
    business_partner_print_format: Schema.Attribute.String;
    business_partner_supplement_name: Schema.Attribute.String;
    c4c_account_id: Schema.Attribute.String;
    c4c_contact_id: Schema.Attribute.String;
    contact_companies: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-contact.business-partner-contact'
    >;
    contact_company_addresses: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-contact-to-address.bp-contact-to-address'
    >;
    contact_company_func_and_depts: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-contact-to-func-and-dept.bp-contact-to-func-and-dept'
    >;
    contact_person_addresses: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-contact-to-address.bp-contact-to-address'
    >;
    contact_person_func_and_depts: Schema.Attribute.Relation<
      'oneToMany',
      'api::bp-contact-to-func-and-dept.bp-contact-to-func-and-dept'
    >;
    contact_persons: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-contact.business-partner-contact'
    >;
    correspondence_language: Schema.Attribute.String;
    created_by_user: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    creation_date: Schema.Attribute.DateTime;
    creation_time: Schema.Attribute.DateTime;
    credit_worthiness: Schema.Attribute.Relation<
      'oneToOne',
      'api::bp-credit-worthiness.bp-credit-worthiness'
    >;
    etag: Schema.Attribute.String;
    first_name: Schema.Attribute.String;
    form_of_address: Schema.Attribute.String;
    gender_code_name: Schema.Attribute.String;
    group_business_partner_name1: Schema.Attribute.String;
    group_business_partner_name2: Schema.Attribute.String;
    identifications: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-identification.business-partner-identification'
    >;
    independent_address_id: Schema.Attribute.String;
    industry: Schema.Attribute.String;
    initials: Schema.Attribute.String;
    international_location_number1: Schema.Attribute.String;
    international_location_number2: Schema.Attribute.String;
    international_location_number3: Schema.Attribute.String;
    intl_loc_number: Schema.Attribute.Relation<
      'oneToOne',
      'api::bp-addr-depdnt-intl-loc-number.bp-addr-depdnt-intl-loc-number'
    >;
    is_female: Schema.Attribute.Boolean;
    is_male: Schema.Attribute.Boolean;
    is_marked_for_archiving: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    is_natural_person: Schema.Attribute.Boolean;
    is_sex_unknown: Schema.Attribute.Boolean;
    language: Schema.Attribute.String;
    last_change_date: Schema.Attribute.DateTime;
    last_change_time: Schema.Attribute.DateTime;
    last_changed_by_user: Schema.Attribute.String;
    last_name: Schema.Attribute.String;
    last_name_prefix: Schema.Attribute.String;
    last_name_second_prefix: Schema.Attribute.String;
    legal_form: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner.business-partner'
    >;
    marketing_attributes: Schema.Attribute.Relation<
      'oneToOne',
      'api::bp-marketing-attribute.bp-marketing-attribute'
    >;
    middle_name: Schema.Attribute.String;
    name_country: Schema.Attribute.String;
    name_format: Schema.Attribute.String;
    natural_person_employer_name: Schema.Attribute.String;
    org_bp_name1: Schema.Attribute.String;
    org_bp_name2: Schema.Attribute.String;
    org_bp_name3: Schema.Attribute.String;
    org_bp_name4: Schema.Attribute.String;
    organization_foundation_date: Schema.Attribute.DateTime;
    organization_liquidation_date: Schema.Attribute.DateTime;
    payment_cards: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-payment-card.business-partner-payment-card'
    >;
    person_full_name: Schema.Attribute.String;
    person_number: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    relationships1: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-relationship.business-partner-relationship'
    >;
    relationships2: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-relationship.business-partner-relationship'
    >;
    roles: Schema.Attribute.Relation<
      'oneToMany',
      'api::business-partner-role.business-partner-role'
    >;
    search_term1: Schema.Attribute.String;
    search_term2: Schema.Attribute.String;
    trading_partner: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Struct.CollectionTypeSchema {
  collectionName: 'categories';
  info: {
    description: 'Organize your content into categories';
    displayName: 'Category';
    pluralName: 'categories';
    singularName: 'category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCrmActivityCrmActivity extends Struct.CollectionTypeSchema {
  collectionName: 'crm_activities';
  info: {
    displayName: 'CRM Activity';
    pluralName: 'crm-activities';
    singularName: 'crm-activity';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    account_uuid: Schema.Attribute.String;
    activity_id: Schema.Attribute.String & Schema.Attribute.Unique;
    activity_status: Schema.Attribute.String;
    actual_duration: Schema.Attribute.String;
    appointment_category: Schema.Attribute.String;
    brand: Schema.Attribute.String;
    completion_date: Schema.Attribute.DateTime;
    completion_percent: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customer_group: Schema.Attribute.String;
    customer_timezone: Schema.Attribute.String;
    disposition_code: Schema.Attribute.String;
    distribution_channel: Schema.Attribute.String;
    division: Schema.Attribute.String;
    document_type: Schema.Attribute.String;
    due_date: Schema.Attribute.DateTime;
    end_date: Schema.Attribute.DateTime;
    full_day_indicator: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    initiator_code: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::crm-activity.crm-activity'
    >;
    location: Schema.Attribute.String;
    main_account_party_id: Schema.Attribute.String;
    main_contact_party_id: Schema.Attribute.String;
    main_employee_responsible_party_id: Schema.Attribute.String;
    organizer_party_id: Schema.Attribute.String;
    owner_party_id: Schema.Attribute.String;
    phone_call_category: Schema.Attribute.String;
    planned_duration: Schema.Attribute.String;
    primary_contact_uuid: Schema.Attribute.String;
    priority: Schema.Attribute.String;
    processor_party_id: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    ranking: Schema.Attribute.String;
    reason: Schema.Attribute.String;
    sales_organization: Schema.Attribute.String;
    start_date: Schema.Attribute.DateTime;
    subject: Schema.Attribute.Text;
    task_category: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCrmFollowUpAndRelatedItemCrmFollowUpAndRelatedItem
  extends Struct.CollectionTypeSchema {
  collectionName: 'crm_follow_up_and_related_items';
  info: {
    displayName: 'CRM Follow Up And Related Item';
    pluralName: 'crm-follow-up-and-related-items';
    singularName: 'crm-follow-up-and-related-item';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    activity_id: Schema.Attribute.String;
    activity_transaction_id: Schema.Attribute.String;
    activity_type_code: Schema.Attribute.String;
    btd_role_code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::crm-follow-up-and-related-item.crm-follow-up-and-related-item'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type_code: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCrmInvolvedPartyCrmInvolvedParty
  extends Struct.CollectionTypeSchema {
  collectionName: 'crm_involved_parties';
  info: {
    displayName: 'CRM Involved Party';
    pluralName: 'crm-involved-parties';
    singularName: 'crm-involved-party';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    activity_id: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::crm-involved-party.crm-involved-party'
    >;
    main_indicator: Schema.Attribute.Boolean;
    party_id: Schema.Attribute.String;
    party_type_code: Schema.Attribute.String;
    party_uuid: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    role_category_code: Schema.Attribute.String;
    role_code: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCrmNoteCrmNote extends Struct.CollectionTypeSchema {
  collectionName: 'crm_notes';
  info: {
    displayName: 'CRM Note';
    pluralName: 'crm-notes';
    singularName: 'crm-note';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    activity_id: Schema.Attribute.String;
    bp_id: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    is_global_note: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::crm-note.crm-note'
    >;
    note: Schema.Attribute.Text;
    opportunity_id: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCrmOpportunityPartyContactPartyCrmOpportunityPartyContactParty
  extends Struct.CollectionTypeSchema {
  collectionName: 'crm_opportunity_party_contact_parties';
  info: {
    displayName: 'CRM Opportunity Party Contact Party';
    pluralName: 'crm-opportunity-party-contact-parties';
    singularName: 'crm-opportunity-party-contact-party';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    attitude_toward_opportunity_code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::crm-opportunity-party-contact-party.crm-opportunity-party-contact-party'
    >;
    object_id: Schema.Attribute.String;
    opportunity_id: Schema.Attribute.String;
    opportunity_party_contact_main_indicator: Schema.Attribute.Boolean;
    opportunity_party_contact_party_id: Schema.Attribute.String;
    parent_object_id: Schema.Attribute.String;
    party_contact_party_uuid: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    role_code: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    uuid: Schema.Attribute.UID;
  };
}

export interface ApiCrmOpportunityPartyCrmOpportunityParty
  extends Struct.CollectionTypeSchema {
  collectionName: 'crm_opportunity_parties';
  info: {
    displayName: 'CRM Opportunity Party';
    pluralName: 'crm-opportunity-parties';
    singularName: 'crm-opportunity-party';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::crm-opportunity-party.crm-opportunity-party'
    >;
    main_indicator: Schema.Attribute.Boolean;
    object_id: Schema.Attribute.String;
    opportunity_id: Schema.Attribute.String;
    parent_object_id: Schema.Attribute.String;
    party_id: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    role_category_code: Schema.Attribute.String;
    role_code: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCrmOpportunityCrmOpportunity
  extends Struct.CollectionTypeSchema {
  collectionName: 'crm_opportunities';
  info: {
    displayName: 'CRM Opportunity';
    pluralName: 'crm-opportunities';
    singularName: 'crm-opportunity';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    approval_status_code: Schema.Attribute.String;
    approver_party_id: Schema.Attribute.String;
    best_connected_colleague: Schema.Attribute.String;
    bill_to_party_id: Schema.Attribute.String;
    consistency_status_code: Schema.Attribute.String;
    created_by: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    creation_date: Schema.Attribute.Date;
    creation_date_time: Schema.Attribute.DateTime;
    deal_score: Schema.Attribute.Decimal;
    deal_score_reason: Schema.Attribute.String;
    distribution_channel_code: Schema.Attribute.String;
    division_code: Schema.Attribute.String;
    end_buyer_party_id: Schema.Attribute.String;
    expected_processing_end_date: Schema.Attribute.Date;
    expected_processing_start_date: Schema.Attribute.Date;
    expected_revenue_amount: Schema.Attribute.Decimal;
    expected_revenue_amount_currency_code: Schema.Attribute.String;
    expected_revenue_end_date: Schema.Attribute.Date;
    expected_revenue_start_date: Schema.Attribute.Date;
    external_id: Schema.Attribute.String;
    external_user_status_code: Schema.Attribute.String;
    group_code: Schema.Attribute.String;
    header_revenue_schedule: Schema.Attribute.Boolean;
    last_change_date: Schema.Attribute.Date;
    last_change_date_time: Schema.Attribute.DateTime;
    last_changed_by: Schema.Attribute.String;
    life_cycle_status_code: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::crm-opportunity.crm-opportunity'
    >;
    main_employee_responsible_party_id: Schema.Attribute.String;
    name: Schema.Attribute.String;
    need_help: Schema.Attribute.Boolean;
    object_id: Schema.Attribute.String;
    opportunity_id: Schema.Attribute.String & Schema.Attribute.Unique;
    origin_type_code: Schema.Attribute.String;
    payer_party_id: Schema.Attribute.String;
    phase_progress_evaluation_status_code: Schema.Attribute.String;
    primary_contact_party_id: Schema.Attribute.String;
    priority_code: Schema.Attribute.String;
    probability_percent: Schema.Attribute.Integer;
    process_status_valid_since_date: Schema.Attribute.Date;
    processing_type_code: Schema.Attribute.String;
    product_recepient_party_id: Schema.Attribute.String;
    prospect_budget_amount: Schema.Attribute.Decimal;
    prospect_budget_amount_currency_code: Schema.Attribute.String;
    prospect_party_id: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    result_reason_code: Schema.Attribute.String;
    sales_cycle_code: Schema.Attribute.String;
    sales_cycle_phase_code: Schema.Attribute.String;
    sales_cycle_phase_start_date: Schema.Attribute.Date;
    sales_forecast_category_code: Schema.Attribute.String;
    sales_group_id: Schema.Attribute.String;
    sales_office_id: Schema.Attribute.String;
    sales_organisation_id: Schema.Attribute.String;
    sales_revenue_forecast_relevance_indicator: Schema.Attribute.Boolean;
    sales_territory_id: Schema.Attribute.String;
    sales_unit_party_id: Schema.Attribute.String;
    score: Schema.Attribute.Decimal;
    seller_party_id: Schema.Attribute.String;
    total_expected_net_amount: Schema.Attribute.Decimal;
    total_expected_net_amount_amount_currency_code: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    uuid: Schema.Attribute.String;
    weighted_expected_net_amount: Schema.Attribute.Decimal;
    weighted_expected_net_amount_currency_code: Schema.Attribute.String;
  };
}

export interface ApiGlobalGlobal extends Struct.SingleTypeSchema {
  collectionName: 'globals';
  info: {
    description: 'Define global settings';
    displayName: 'Global';
    pluralName: 'globals';
    singularName: 'global';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    defaultSeo: Schema.Attribute.Component<'shared.seo', false>;
    favicon: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::global.global'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    siteDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    siteName: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiImportFileLogImportFileLog
  extends Struct.CollectionTypeSchema {
  collectionName: 'import_file_logs';
  info: {
    displayName: 'Import File Log';
    pluralName: 'import-file-logs';
    singularName: 'import-file-log';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    data: Schema.Attribute.JSON;
    import_file_id: Schema.Attribute.Relation<
      'manyToOne',
      'api::import-file-state.import-file-state'
    >;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::import-file-log.import-file-log'
    >;
    log_status: Schema.Attribute.Enumeration<['SUCCESS', 'FAILED']>;
    message: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    row_number: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiImportFileStateImportFileState
  extends Struct.CollectionTypeSchema {
  collectionName: 'import_file_states';
  info: {
    displayName: 'Import File State';
    pluralName: 'import-file-states';
    singularName: 'import-file-state';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    completed_count: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    failed_count: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    file_name: Schema.Attribute.String;
    file_size: Schema.Attribute.Integer;
    file_status: Schema.Attribute.Enumeration<
      ['IN_PROGRESS', 'DONE', 'FAILED']
    > &
      Schema.Attribute.DefaultTo<'IN_PROGRESS'>;
    file_type: Schema.Attribute.String;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::import-file-state.import-file-state'
    >;
    logs: Schema.Attribute.Relation<
      'oneToMany',
      'api::import-file-log.import-file-log'
    >;
    message: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    success_count: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    table_name: Schema.Attribute.Enumeration<
      [
        'FG_CONTROL_MAIN',
        'FG_CUSTOMER_BUSINESS',
        'FG_PRODUCT_BUSINESS',
        'FG_RELATIONSHIP',
        'PRODUCT',
        'PRODUCT_MEDIA',
        'PRODUCT_SUGGESTION',
        'CRM_ACTIVITY',
        'CONTACT',
        'BUSINESS_PARTNER',
      ]
    >;
    total_count: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::audit-log': AdminAuditLog;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about.about': ApiAboutAbout;
      'api::article.article': ApiArticleArticle;
      'api::author.author': ApiAuthorAuthor;
      'api::bp-addr-depdnt-intl-loc-number.bp-addr-depdnt-intl-loc-number': ApiBpAddrDepdntIntlLocNumberBpAddrDepdntIntlLocNumber;
      'api::bp-address-usage.bp-address-usage': ApiBpAddressUsageBpAddressUsage;
      'api::bp-contact-to-address.bp-contact-to-address': ApiBpContactToAddressBpContactToAddress;
      'api::bp-contact-to-func-and-dept.bp-contact-to-func-and-dept': ApiBpContactToFuncAndDeptBpContactToFuncAndDept;
      'api::bp-credit-worthiness.bp-credit-worthiness': ApiBpCreditWorthinessBpCreditWorthiness;
      'api::bp-email-address.bp-email-address': ApiBpEmailAddressBpEmailAddress;
      'api::bp-fax-number.bp-fax-number': ApiBpFaxNumberBpFaxNumber;
      'api::bp-home-page-url.bp-home-page-url': ApiBpHomePageUrlBpHomePageUrl;
      'api::bp-intl-address-version.bp-intl-address-version': ApiBpIntlAddressVersionBpIntlAddressVersion;
      'api::bp-marketing-attribute.bp-marketing-attribute': ApiBpMarketingAttributeBpMarketingAttribute;
      'api::bp-phone-number.bp-phone-number': ApiBpPhoneNumberBpPhoneNumber;
      'api::business-partner-address.business-partner-address': ApiBusinessPartnerAddressBusinessPartnerAddress;
      'api::business-partner-bank.business-partner-bank': ApiBusinessPartnerBankBusinessPartnerBank;
      'api::business-partner-contact.business-partner-contact': ApiBusinessPartnerContactBusinessPartnerContact;
      'api::business-partner-extension.business-partner-extension': ApiBusinessPartnerExtensionBusinessPartnerExtension;
      'api::business-partner-identification.business-partner-identification': ApiBusinessPartnerIdentificationBusinessPartnerIdentification;
      'api::business-partner-payment-card.business-partner-payment-card': ApiBusinessPartnerPaymentCardBusinessPartnerPaymentCard;
      'api::business-partner-relationship.business-partner-relationship': ApiBusinessPartnerRelationshipBusinessPartnerRelationship;
      'api::business-partner-role.business-partner-role': ApiBusinessPartnerRoleBusinessPartnerRole;
      'api::business-partner.business-partner': ApiBusinessPartnerBusinessPartner;
      'api::category.category': ApiCategoryCategory;
      'api::crm-activity.crm-activity': ApiCrmActivityCrmActivity;
      'api::crm-follow-up-and-related-item.crm-follow-up-and-related-item': ApiCrmFollowUpAndRelatedItemCrmFollowUpAndRelatedItem;
      'api::crm-involved-party.crm-involved-party': ApiCrmInvolvedPartyCrmInvolvedParty;
      'api::crm-note.crm-note': ApiCrmNoteCrmNote;
      'api::crm-opportunity-party-contact-party.crm-opportunity-party-contact-party': ApiCrmOpportunityPartyContactPartyCrmOpportunityPartyContactParty;
      'api::crm-opportunity-party.crm-opportunity-party': ApiCrmOpportunityPartyCrmOpportunityParty;
      'api::crm-opportunity.crm-opportunity': ApiCrmOpportunityCrmOpportunity;
      'api::global.global': ApiGlobalGlobal;
      'api::import-file-log.import-file-log': ApiImportFileLogImportFileLog;
      'api::import-file-state.import-file-state': ApiImportFileStateImportFileState;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
