set -e
export DEEP_LOGGING='info'
cd ~/DeepModeratorWeb
git pull
yarn install
pm2 restart DeepModeratorWeb
