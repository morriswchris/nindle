FROM ubuntu:14.04.2

# Install calibre deps and then nodejs deps
RUN apt-get update \
    && apt-get install -y \
        python \
        wget \
        gcc \
        xz-utils \
        imagemagick \
        xdg-utils \
    && apt-get install -y \
        build-essential \
        curl \
    && apt-get install -y \
        git-core \
    && apt-get clean

# Install calibre
RUN sudo -v && wget -nv -O- https://raw.githubusercontent.com/kovidgoyal/calibre/master/setup/linux-installer.py | sudo python -c "import sys; main=lambda:sys.stderr.write('Download failed\n'); exec(sys.stdin.read()); main()"

# Install nodejs
ENV USER nodejs
ENV NODE_VERSION 6.9.5

RUN useradd --create-home --shell /bin/bash $USER

USER $USER

RUN cd \
    && mkdir tools \
    && curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
    && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /home/$USER/tools/ \
    && rm "node-v$NODE_VERSION-linux-x64.tar.gz"

ENV PATH $PATH:/home/$USER/tools/node-v$NODE_VERSION-linux-x64/bin

# Get project
ENV PROJECT_DIRECTORY /home/$USER/nindle
RUN cd \
    && mkdir -p $PROJECT_DIRECTORY/ \
    && cd $PROJECT_DIRECTORY \
    && git init \
    && git remote add origin https://github.com/morriswchris/nindle.git \
    && git pull origin master \
    && npm install

RUN chmod \+x $PROJECT_DIRECTORY/index.js

COPY .nindle/ /home/$USER/.nindle
USER root
RUN chown \-R $USER:$USER /home/$USER/.nindle
USER $USER

# expose our app entry point
ENTRYPOINT ["/home/nodejs/nindle/index.js"]
