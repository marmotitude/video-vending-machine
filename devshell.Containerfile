FROM node:lts-alpine

RUN apk add --no-cache \
      gvim vim-doc \
      git git-doc \
      fish fish-doc \
      ripgrep ripgrep-doc ripgrep-fish-completion

ENV PATH="${PATH}:/usr/local/bin/node"

