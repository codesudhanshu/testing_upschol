source /home/ubuntu/.nvm/nvm.sh;
cd /home/ubuntu/upschol
git pull origin master
npm ci
rm -rf .next
unzip .next.zip
rm .next.zip
npm ci 
pm2 restart all