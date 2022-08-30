
source docker/dockerCreds.sh
echo $dockerUser

if [ -z $dockerUser ]; then
    read -p "Docker username ? > " dockerUser
fi

if [ -z $dockerPassword ]; then
    read -p "Docker password ? > " dockerPassword
fi



docker login -u $dockerUser -p $dockerPassword