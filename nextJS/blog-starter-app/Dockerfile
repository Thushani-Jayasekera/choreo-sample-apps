# --------------------------------------------------------------------
# Copyright (c) 2023, WSO2 Inc. (http://wso2.com) All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# -----------------------------------------------------------------------

FROM node:18.12.1-alpine3.17

WORKDIR /usr/src/app
COPY package*.json ./

ENV npm_config_cache=/usr/src/app

RUN npm ci --prefer-offline --no-audit

COPY . .

# RUN npx eslint src
RUN npm run build

RUN chown -R 10500:10500 "/usr/src/app"

EXPOSE 3000

CMD [ "npm", "start" ]