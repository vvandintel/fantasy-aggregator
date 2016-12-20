function dataRequestLeaders(url) {
 $.getJSON(url, function(data) {
  $('.table-leaders tr:gt(0)').remove();

  $.each(data, function(i, leader) {
   $('.table-leaders').append(`<tr>
      <td> ${leader.season}</td><td>${leader.week}</td>
      <td><a href="/leaders/${leader._id}" class="btn btn-default btn-sm">View</a></td>
     </tr>`);
  });
 });
}

function dataRequestLeadersByWeek(url, position, week) {
 $.getJSON(url, function(data) {
  $('.table-leaders tr:gt(0)').remove();

  let positions = data[0].positions[0];

  for (let i = 0; i < data.length; i++) {
   if (data[i].week == week) {
    positions = data[i].positions[0];
    break;
   }
  }

  for (let i = 0; i < positions[position].length; i++) {
   const player = positions[position][i];
    if (player.pts == false) {
     player.pts = "";

     if (player.projectedPts == false ) {
      continue;
     }
    }
    $('.table-leaders').append(
     `<tr>
         <td>${player.firstName} ${player.lastName}</td>
         <td>${player.pts}</td>
         <td>${player.projectedPts}</td>
         <td>${player.teamAbbr}</td>
         <td>${player.opponentTeamAbbr}</td>
         <td>${player.status}</td>
         <td>${player.statsLine}</td>
     </tr>`);
  };
 });
}