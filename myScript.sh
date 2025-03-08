source /home/ubuntu/.nvm/nvm.sh;

cd /home/ubuntu/
pm2 delete upschol
rm -rf upschol
mkdir upschol
tar -xzvf develop.tar -C upschol
rm develop.tar
cd upschol
pm2 start --name upschol npm -- start