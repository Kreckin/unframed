# Pull Request Testing

##General Process
1. See unassigned Pull Request
2. Assign yourself so people know its being worked on
3. checkout to the master branch
4. pull the latest changes, and the new branch
5. switch to that branch
6. test it, make sure everything works
7. update author on status of pull request

##Detailed Process

#Assigning Pull Request 

1. See someone in Slack said they submitted a pull request (or specifically requested you for it)
2. Assign yourself to that pull request on the github website

#Getting to that branch

1. go to the master branch and pull down the latest changes (this will include all branches that have been pushed up)
```bash
git checkout master
git pull
```
2. checkout to that branch, you can find it in the terminal text after the pull, or on the pull request page
```bash
git checkout branchname
```

#Test the proposed changes

1. load up that branch's version of the simulation
```bash
react-native run-ios
```
2. test to see if the code is still functional

#Update author
1. If the code is not functional, update the author and tell them the errors you are receiving  
2. if the code is still functional, read their code (I suggest on the git website since that will only show their changes)
3. Check for comments, if you see something you don't understand, ask the author to comment it
4. Merge



#KNOWN BUG
your simulator will update the proj file without you doing anything, to escape this horrible scenario do this
```bash
git stash && git checkout master
``
