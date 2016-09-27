module GitLabI18NPatch
  module Util
    def web_port(base_port, version_str)
      return base_port.to_i + version_str.to_s.gsub(/v/, "").gsub(/\./, "").to_i
    end

    module_function :web_port
  end
end
