FROM gitlab/gitlab-ce:9.0.4-ce.0

ADD patches/v9.0.4/app_ja.patch /tmp/
RUN apt-get update > /dev/null 2>&1 \
    && apt-get install patch > /dev/null 2>&1 \
    && cd /opt/gitlab/embedded/service/gitlab-rails \
    && patch -p1 < /tmp/app_ja.patch > /dev/null 2>&1
