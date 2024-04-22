FROM node:lts-alpine

RUN apk add --no-cache \
      aws-cli \
      gvim vim-doc \
      git git-doc \
      fish fish-doc \
      ripgrep ripgrep-doc ripgrep-fish-completion

ENV PATH="${PATH}:/usr/local/bin/node"

