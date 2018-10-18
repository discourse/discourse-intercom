# name: discourse-intercom
# about: Integration features between Intercom and Discourse
# version: 0.1
# author: Vinoth Kannan

enabled_site_setting :intercom_enabled

after_initialize do
  add_to_serializer(:current_user, :email) do
    object.email
  end

  add_to_serializer(:current_user, :intercom_hash) do
    OpenSSL::HMAC.hexdigest(
      'sha256',
      SiteSetting.intercom_secret_key,
      object.email
    )
  end
end
