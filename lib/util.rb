require_relative "../config/config.rb"

module GitLabI18NPatch
  module Util
    def web_port(version_str)
      return $base_port.to_i + version_str.gsub(/\./, "").to_i
    end

    module_function :web_port
  end
end
