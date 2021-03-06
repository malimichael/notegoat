function o (id) {
  return document.getElementById(id);
}
function c (klass) {
  console.log(document.getElementsByClassName(klass)[0])
  return document.getElementsByClassName(klass)[0];
}

function getNoteIndexFromUrl (callback) {
  callback(location.hash.split('#')[1]);
}

o('addNote').addEventListener('click', function() {
  note.save( o('noteContent').value );
  o('noteContent').value = '';
});

o('addNote').addEventListener('click', function() {
  note.getAll(function (notes) {
    view.renderAll(notes);
  });
});


window.addEventListener('hashchange', function() {
  getNoteIndexFromUrl( function (index) {
    note.get(index, function (note) {
      view.renderFocus(note);
      applyDeleteListener();
    });
  });
});

window.addEventListener('load', function () {
  if ( location.hash !== "" ) {
    getNoteIndexFromUrl( function (index) {
      note.get(index, function (note) {
        view.renderFocus(note);
        applyDeleteListener();
      });
    });
  }
});

function applyDeleteListener () {
  c('delete').addEventListener('click', function () {
    getNoteIndexFromUrl( function (index) {
      note.deleteOne(index, function () {
        o('focusNote').innerHTML = '';
        note.getAll(function (notes) {
          view.renderAll(notes);
        });
      });
    });
  });
}

o('delete').addEventListener('click', function () {
  note.deleteAll();
  location.reload();
});
