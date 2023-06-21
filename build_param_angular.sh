#!/bin/bash
cd /root
. /root/.bashrc
. ~/.bashrc
find /root/.jenkins/workspace/Sellershub_SVN_AngularApplication -name .svn -exec ls '{}' \;
find /root/.jenkins/workspace/Sellershub_SVN_AngularApplication -name .svn -exec rm -rf '{}' \;
rm -rf /root/.jenkins/workspace/Sellershub_SVN_AngularApplication/dist
cd /root/.jenkins/workspace/Sellershub_SVN_AngularApplication
ng build --configuration=$1
rm -rf /root/.jenkins/workspace/Sellershub_SVN_AngularApplication/node_modules
