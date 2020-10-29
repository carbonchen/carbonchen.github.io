window.addEventListener('DOMContentLoaded', init);

// read from local storage and add items
function init() {
    if (localStorage.getItem('posts')) {
        posts_array = Array.from(JSON.parse(localStorage.getItem('posts')));
        read_array = Array.from(JSON.parse(localStorage.getItem('posts')));
    }

    let template = document.getElementById('new_blog');
    for (let i = 0; i < read_array.length; i++) {
        // create clone of storage item
        let clone = template.content.cloneNode(true);
        let array_entry = JSON.parse(read_array[i]);
        clone.querySelector('.entered_title').innerHTML = array_entry.title;
        clone.querySelector('.entered_date').innerHTML = array_entry.date;
        clone.querySelector('.entered_summary').innerHTML = array_entry.summary;

        // bind delete/edit buttons
        clone.querySelector('#delete').addEventListener('click', deleteEntry);
        clone.querySelector('#edit').addEventListener('click', openDialog_edit);

        // add to DOM
        document.getElementById('blogs_list').appendChild(clone);
    }
}

function closeDialog() {
    let popup = document.getElementById('popup');
    popup.open = false;
}

// close edit dialog window
function closeDialog_edit() {
    let popup = document.getElementById('popup_edit');
    popup.open = false;
}

function openDialog() {
    let popup = document.getElementById('popup');
    popup.open = true;
}

// global variable tracking the current node being edited
var current_edit;
// tracks all posts items
var posts_array = new Array();

// open edit dialog window with previous entries filled in already
function openDialog_edit(e) {
    let item = e.target.parentNode;
    current_edit = item;
    let prev_title = item.querySelector('.entered_title').innerHTML;
    let prev_date = item.querySelector('.entered_date').innerHTML;
    let prev_summary = item.querySelector('.entered_summary').innerHTML;

    // if prev entries blank, fill dialog window with blanks
    // otherwise fill in with prev entries
    if (prev_title.localeCompare("[<i>Title missing</i>]") == 0) {
        document.getElementById('title_edit').value = "";
    }
    else {
        document.getElementById('title_edit').value = prev_title;
    }
    if (prev_date.localeCompare("[<i>Date missing</i>]") == 0) {
        document.getElementById('date_edit').value = "";
    }
    else {
        document.getElementById('date_edit').value = prev_date;
    }
    if (prev_summary.localeCompare("[<i>Summary missing</i>]") == 0) {
        document.getElementById('summary_edit').value = "";
    }
    else {
        document.getElementById('summary_edit').value = prev_summary;
    }

    let popup = document.getElementById('popup_edit');
    popup.open = true;
}

function addEntry() {
    // retrieve text input values and create clone with those values
    let template = document.getElementById('new_blog');
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let summary = document.getElementById('summary').value;
    let clone = template.content.cloneNode(true);

    // local storage object
    let entry = {};

    // checking if entries are empty, and inserting cleaned entries to clone
    if(title) {
        let cleaned_title = DOMPurify.sanitize(title);
        clone.querySelector('.entered_title').innerHTML = cleaned_title;
        entry.title = cleaned_title;
    }
    else {
        clone.querySelector('.entered_title').innerHTML = "[<i>Title missing</i>]";
        entry.title = "[<i>Title missing</i>]";
    }
    if(date) {
        let cleaned_date = DOMPurify.sanitize(date);
        clone.querySelector('.entered_date').innerHTML = cleaned_date;
        entry.date = cleaned_date;
    }
    else {
        clone.querySelector('.entered_date').innerHTML = "[<i>Date missing</i>]";
        entry.date = "[<i>Date missing</i>]";
    }
    if(summary) {
        let cleaned_summary = DOMPurify.sanitize(summary);
        clone.querySelector('.entered_summary').innerHTML = cleaned_summary;
        entry.summary = cleaned_summary;
    }
    else {
        clone.querySelector('.entered_summary').innerHTML = "[<i>Summary missing</i>]";
        entry.summary = "[<i>Summary missing</i>]";
    }
    // bind delete/edit buttons
    clone.querySelector('#delete').addEventListener('click', deleteEntry);
    clone.querySelector('#edit').addEventListener('click', openDialog_edit);

    // add to DOM
    document.getElementById('blogs_list').appendChild(clone);

    // add to local storage
    entry = JSON.stringify(entry);
    posts_array.push(entry);
    localStorage.setItem('posts', JSON.stringify(posts_array));

    document.getElementById('title').value = "";
    document.getElementById('date').value = "";
    document.getElementById('summary').value = "";
    closeDialog();
}

function deleteEntry(e) {
    let list = e.target.parentNode.parentNode;
    list.removeChild(e.target.parentNode);

    // remove from local storage
    let item = e.target.parentNode;
    let title = item.querySelector('.entered_title').innerHTML;
    let date = item.querySelector('.entered_date').innerHTML;
    let summary = item.querySelector('.entered_summary').innerHTML;

    // find and remove post from array
    for (let i = 0; i < posts_array.length; i++) {
        let array_entry = JSON.parse(posts_array[i]);
        if (title.localeCompare(array_entry.title) == 0) {
            if (date.localeCompare(array_entry.date) == 0) {
                if (summary.localeCompare(array_entry.summary) == 0) {
                    posts_array.splice(i, 1);
                }
            }
        }
    }
    // update local storage
    localStorage.setItem('posts', JSON.stringify(posts_array));
}

// basically just like addEntry(), redundant coding but good enough for now
function editEntry() {    
    let template = document.getElementById('new_blog');
    let title = document.getElementById('title_edit').value;
    let date = document.getElementById('date_edit').value;
    let summary = document.getElementById('summary_edit').value;
    let clone = template.content.cloneNode(true);

    // checking if entries are empty, and inserting cleaned entries to clone
    if(title) {
        let cleaned_title = DOMPurify.sanitize(title);
        clone.querySelector('.entered_title').innerHTML = cleaned_title;
    }
    else {
        clone.querySelector('.entered_title').innerHTML = "[<i>Title missing</i>]";
    }
    if(date) {
        let cleaned_date = DOMPurify.sanitize(date);
        clone.querySelector('.entered_date').innerHTML = cleaned_date;
    }
    else {
        clone.querySelector('.entered_date').innerHTML = "[<i>Date missing</i>]";
    }
    if(summary) {
        let cleaned_summary = DOMPurify.sanitize(summary);
        clone.querySelector('.entered_summary').innerHTML = cleaned_summary;
    }
    else {
        clone.querySelector('.entered_summary').innerHTML = "[<i>Summary missing</i>]";
    }
    // bind delete/edit buttons
    clone.querySelector('#delete').addEventListener('click', deleteEntry);
    clone.querySelector('#edit').addEventListener('click', openDialog_edit);

    // replace info on local storage
    let prev_title = current_edit.querySelector('.entered_title').innerHTML;
    let prev_date = current_edit.querySelector('.entered_date').innerHTML;
    let prev_summary = current_edit.querySelector('.entered_summary').innerHTML;

    // find post in array
    for (let i = 0; i < posts_array.length; i++) {
        let array_entry = JSON.parse(posts_array[i]);
        if (prev_title.localeCompare(array_entry.title) == 0) {
            if (prev_date.localeCompare(array_entry.date) == 0) {
                if (prev_summary.localeCompare(array_entry.summary) == 0) {
                    // edit that info
                    array_entry["title"] = clone.querySelector('.entered_title').innerHTML;
                    array_entry["date"] = clone.querySelector('.entered_date').innerHTML;
                    array_entry["summary"] = clone.querySelector('.entered_summary').innerHTML;
                    // replace old with new in array
                    let replace_entry = JSON.stringify(array_entry);
                    posts_array[i] = replace_entry;
                }
            }
        }
    }
    // update local storage
    localStorage.setItem('posts', JSON.stringify(posts_array));

    // replace edited node with new clone
    document.getElementById('blogs_list').replaceChild(clone, current_edit);

    // reset dialog edit window
    document.getElementById('title_edit').value = "";
    document.getElementById('date_edit').value = "";
    document.getElementById('summary_edit').value = "";
    closeDialog_edit();
}