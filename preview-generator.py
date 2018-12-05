import os, sys, json, shutil

# Get the command line arguments
args = sys.argv

# Read the NPM's package.json file
with open('package.json') as json_data:
	npm_package = json.load(json_data)

# Check if there are no args passed, then calmly exit
if not (len(args) == 2):
	print("[ERROR]: Invalid useage!")
	sys.exit(0)

# Check if the argument is prepare
if (args[1] == str("preview")):
	# Create the preview directory
	previewDir = "./preview"
	if os.path.exists(previewDir):
		shutil.rmtree(previewDir, ignore_errors=True)
		os.makedirs(previewDir)
	else:
		os.makedirs(previewDir)

	# Tell the user that preparation of the
	# Statics has been started
	print("Started preparation of static site for project: " + npm_package['name'])

	# Do buster setup
	os.system("buster setup --gh-repo=" + npm_package['repository']['url'] + " --dir=./preview/buster")

	# Do buster generate
	os.system("buster generate --domain=localhost:2368 --dir=./preview/buster")

	# Preview the buster generated folder
	print("Preview server started at: http://localhost:9000, please check out in a browser.")
	os.system("buster preview --dir=./preview/buster")
# Check if the argument is push
elif(args[1] == str("push")):
	# Remove the clonning destination directory before starting
	# So Git won't complain
	os.system("rm -rf \"./preview/" + npm_package['name'] + "/\"")

	# Run a seperate clone
	os.system("git clone --single-branch --branch \"gh-pages\" " + npm_package['repository']['url'] + " \"./preview/" + npm_package['name'] + "\"")

	# RM all the files from git
	os.system("cd ./preview/samskara; git rm -rf ./*")

	# Copy the statics from buster generated folder
	os.system("mv ./preview/buster/* \"./preview/" + npm_package['name'] + "/\"")

	# Remove the buster generated folder
	os.system("rm -rf ./preview/buster")

	# Push to the statics to GitHub
	os.system("cd \"./preview/" + npm_package['name'] + "\"; git add --all; git status; read -n 1 -s -r -p \"Press any key to continue\"; git commit; git push")