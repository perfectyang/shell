#!/bin/bash

for remote in `git branch -r`
do
  git branch remote --track $remote
done
