// Used to add spaces to all .js and text files. Ignores node_modules
const fs = require('fs');
const path = require('path');

// Function to add a newline if needed
function addNewlineIfNeeded(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.error(err);
        }
        // Check if the last character is not a newline
        if (!data.endsWith('\n')) {
            fs.appendFile(filePath, '\n', (err) => {
                if (err) {
                    console.error('Error appending newline to:', filePath, err);
                } else {
                    console.log('Added newline to:', filePath);
                }
            });
        }
    });
}

// Recursive function to process files, skipping specified directories
function fromDir(startPath, filter, skipDirs) {
    if (!fs.existsSync(startPath)) {
        console.log("Directory does not exist:", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    for (let file of files) {
        const filename = path.join(startPath, file);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            // Skip specified directories
            if (!skipDirs.includes(file)) {
                fromDir(filename, filter, skipDirs); // Recurse into subdirectories
            }
        } else if (filter.test(filename)) {
            addNewlineIfNeeded(filename); // Process files that match the filter
        }
    }
}

// List of directories to skip
const skipDirectories = ['node_modules', 'bower_components', '.git'];

// Start from the current directory and check all JavaScript and text files
fromDir('./', /\.(js|txt)$/, skipDirectories);
