#!/bin/bash
cd /root
. /root/.bashrc
. ~/.bashrc
cd /opt/webapps/BACKUP
rm -rf /opt/webapps/BACKUP/SECURE_LASTWORKING/secure
cp -r /opt/webapps/BACKUP/secure /opt/webapps/BACKUP/SECURE_LASTWORKING/
rm -rf /opt/webapps/BACKUP/secure
cp -r /opt/webapps/secure /opt/webapps/BACKUP/
rm -rf /opt/webapps/secure
mkdir -p /opt/webapps/secure
cp -r /root/.jenkins/workspace/Sellershub_SVN_AngularApplication/dist/sellers-hub/* /opt/webapps/secure/

