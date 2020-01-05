$(document).ready(function() {
  //initialize variables
  var rankArray = [],
  sortArray = [],
  collectionsArray = [],
  loopedIndex = 0,
  dataIndex = 0;

  // Create Slug
  var slug = function(string) {

      var $slug = '';
      var trimmed = $.trim(string);
      $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      return $slug.toLowerCase();
  }

  function checkLoop(item, index) {
    if (index != collectionsArray[loopedIndex]) {
      loopInSortArray(item);
      dataIndex += 1;
    } else {
      loopedIndex += 1;
      dataIndex = 0;
      loopInSortArray(item);
    }
  }

  function loopInSortArray(item) {
    for (const v of sortArray) {
      var selector = Object.values(v);
        if (selector.includes(item)) {
          addToData(item, v.index);
        }
    }
  }

  function addToData(item, index) {
    var rankString = "";
    var element = $(".sort-item.w-dyn-item").eq(index).data("sortIndex");

    if (typeof element === "string") {
      rankString = element + dataIndex;
      $(".sort-item.w-dyn-item").eq(index).data("sortIndex", rankString);

    } else {

      $(".sort-item.w-dyn-item").eq(index).data("sortIndex", dataIndex.toString());
    }
  }

  $(".sort-by-list.w-dyn-items").each(function() {
    var listLength = 0;

    $(this).find('.sort-by-item.w-dyn-item').each(function() {
      var name = slug($(this).find("p").text());
      rankArray.push(name);
      listLength++;
    });

    collectionsArray.push(listLength);
  });

  $(".sort-item.w-dyn-item .sort-tag-container").each(function(itemIndex) {
    var tagObject = {"index" : itemIndex};

    $(this).find(".sort-tag").each(function(index) {
      var ref = slug($(this).text());
      tagObject["tagIndex" + index] = ref;
    });
    sortArray.push(tagObject);
  });

  rankArray.forEach(checkLoop);

    var $wrapper = $(".sort-list.w-dyn-items"),
         $items = $wrapper.find(".sort-item.w-dyn-item");
     [].sort.call($items, function(a,b) {
         return +$(a).data('sortIndex') - +$(b).data('sortIndex');
     });
     $wrapper.append($items);
});
