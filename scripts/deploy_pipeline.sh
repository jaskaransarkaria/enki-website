#!/bin/bash

echo `pwd`

civo apikey current production
civo instance list
