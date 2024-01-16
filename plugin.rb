# frozen_string_literal: true
# name: discourse-intercom
# about: Adds Intercom Messenger Integration to Discourse.
# meta_topic_id: 106622
# version: 0.1
# author: Vinoth Kannan

enabled_site_setting :intercom_enabled

after_initialize do
  add_to_serializer(:current_user, :email) { object.email }

  add_to_serializer(:current_user, :intercom_hash) do
    OpenSSL::HMAC.hexdigest("sha256", SiteSetting.intercom_secret_key, object.email)
  end
end
