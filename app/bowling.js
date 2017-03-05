var _activeFrame = 0;
var _activeThrow = 0;

var _disabledColor = "gray";
var _activeColor = "red";
var _pastColor = "white";

var _previousGames = [];

function add_previous_game ( previousGame )
{

	_previousGames.push ( previousGame );

}


function on_load ( )
{

	// 2017-02-19 (g1)
	add_previous_game ( 
		{
			'7', '/',		// Frame 1
			'8', '/',		// Frame 2
			'X', '',		// Frame 3
			'8', '/',		// Frame 4
			'X', '',		// Frame 5
			'9', '.',		// Frame 6
			'X', '',		// Frame 7
			'7', '.',		// Frame 8
			'7', '/',		// Frame 9
			'7', '/', '5'	// Frame 10
		}
	);

	// 2017-02-19 (g2)
	add_previous_game ( 
		{
			'X', '',		// Frame 1
			'X', '',		// Frame 2
			'5', '/',		// Frame 3
			'6', '2',		// Frame 4
			'9', '/',		// Frame 5
			'8', '/',		// Frame 6
			'X', '',		// Frame 7
			'7', '1',		// Frame 8
			'9', '.',		// Frame 9
			'X', '8', '1'	// Frame 10
		}
	);

	// 2017-02-19 (g3)
	add_previous_game ( 
		{
			'9', '/',
			'4', '4',
			'6', '1',
			'9', '/',
			'X', '',
			'9', '/',
			'X', '',
			'7', '2',
			'9', '.',
			'X', '9', '.'
		}
	);




	// 2017-02-26 (g1)
	add_previous_game ( 
		{
			'5', '2',
			'9', '/',
			'6', '2',
			'6', '/',
			'9', '/',
			'9', '/',
			'7', '2',
			'X', '',
			'7', '/',
			'6', '3', '.'
		}
	);

	// 2017-02-26 (g2)
	add_previous_game ( 
		{
			'9', '/',
			'X', '',
			'8', '/',
			'5', '4',
			'9', '.',
			'9', '/',
			'7', '/',
			'6', '.',
			'6', '/',
			'7', '/', '9'
		}
	);


	// 2017-02-26 (g3)
	add_previous_game ( 
		{
			'X', '',
			'X', '',
			'6', '/',
			'8', '1',
			'8', '1',
			'X', '',
			'7', '/',
			'X', '',
			'7', '/',
			'X', 'X', '7'
		}
	);


	var pointCellElements = document.querySelectorAll(".pointCell");

	pointCellElements.forEach(function(pointCell) {
		
		pointCell.addEventListener("click", function() {
			
			point_cell_clicked ( this );

		});

	});


	set_active_frame ( _activeFrame, _activeThrow, true );


	var frameScoreCells = document.querySelectorAll(".frameScoreCell");
	frameScoreCells.forEach(function(frameScoreCell) {
		frameScoreCell.style.color = "gray";
	});


	var buttons = document.querySelectorAll(".scoreButton");
	buttons.forEach(function(btn) {
		btn.addEventListener("click", function() {

			var val = btn.innerHTML;

			document.getElementById(_activeFrame + "" + _activeThrow).innerHTML = val;
			if ( val == "X" )
			{
				if ( (is_next_throw_disabled() === true) && _activeFrame < 9 )
				{
					advance_to_next_throw ( );
				}
				else
				{
					if ( _activeFrame < 9 )
					{
						document.getElementById(_activeFrame + "1").innerHTML = "";
					}
				}
			}
			else if ( val == "/" )
			{

			}
			else
			{

			}


			if ( is_next_throw_disabled() === true )
			{
				advance_to_next_throw ( );
			}


			calculate_score ( );

		});
	});

}

function set_active_frame ( frame, ballThrow, disableFollowingFrames )
{

	var oldID = _activeFrame + "" + _activeThrow;
	document.getElementById(oldID).style.backgroundColor = _pastColor;

	var newID = frame + "" + ballThrow;
	document.getElementById(newID).style.backgroundColor = _activeColor;

	if ( ballThrow === 0 )
	{
		document.getElementById("cmd_strike").style.visibility = "visible";
		document.getElementById("cmd_spare").style.visibility = "hidden";

		for (var index = 1; index <= 9; index++ )
		{
			document.getElementById("cmd_" + index).style.visibility = "visible";
		}
	}
	else
	{
		if ( frame < 9 )
		{
			document.getElementById("cmd_strike").style.visibility = "hidden";
			document.getElementById("cmd_spare").style.visibility = "visible";

			var previousThrowValue = document.getElementById(frame + "" + parseInt(ballThrow-1)).innerHTML;

			if ( previousThrowValue != "." )
			{
				previousThrowValue = 10 - parseInt(previousThrowValue);
				for (var index = 1; index <= 9; index++ )
				{
					if ( index < previousThrowValue )
					{
						document.getElementById("cmd_" + index).style.visibility = "visible";
					}
					else
					{
						document.getElementById("cmd_" + index).style.visibility = "hidden";
					}
				}
			}
			else
			{
				for (var index = 1; index <= 9; index++ )
				{
					document.getElementById("cmd_" + index).style.visibility = "visible";
				}
			}

			console.log ( "Previous", previousThrowValue );
		}
		else
		{
			document.getElementById("cmd_strike").style.visibility = "visible";	// FIXME: Wrong!
			document.getElementById("cmd_spare").style.visibility = "visible";
		}
	}				


	if ( disableFollowingFrames === true )
	{

		if ( frame < 9 )
		{
			if ( ballThrow === 0 )
			{
				document.getElementById(frame + "1").style.backgroundColor = _disabledColor;
			}
		}
		else
		{
			if ( ballThrow === 0 )
			{
				document.getElementById(frame + "1").style.backgroundColor = _disabledColor;
				document.getElementById(frame + "2").style.backgroundColor = _disabledColor;
			}
			else if ( ballThrow === 1 )
			{
				document.getElementById(frame + "2").style.backgroundColor = _disabledColor;
			}
		}

		for ( var index = frame + 1; index < 10; index++ )
		{
			disable_frame ( index );
		}
	}

	_activeFrame = frame;
	_activeThrow = ballThrow;
}

function disable_frame ( frame )
{

	document.getElementById(frame + "0").style.backgroundColor = _disabledColor;
	document.getElementById(frame + "1").style.backgroundColor = _disabledColor;

	if ( frame === 9 )
	{
		document.getElementById(frame + "2").style.backgroundColor = _disabledColor;
	}
}

function point_cell_clicked ( pointCell )
{

	var pointCellFrame = parseInt(pointCell.id.charAt(0));
	var pointCellThrow = parseInt(pointCell.id.charAt(1));

	if ( pointCell.style.backgroundColor == _disabledColor )
	{
		
	}
	else if ( pointCell.style.backgroundColor == _activeColor )
	{

	}
	else
	{
		set_active_frame ( pointCellFrame, pointCellThrow, false );
	}				

}

function is_next_throw_disabled ( )
{
	var nextFrame = _activeFrame;
	var nextThrow = _activeThrow;

	nextThrow++;
	if ( (nextThrow == 2) && (nextFrame < 9) )
	{
		nextThrow = 0;
		nextFrame++;
	}
	else if ( nextFrame == 9 )
	{
		if ( nextThrow == 3 )
		{
			nextThrow--;
		}
	}

	return (document.getElementById(nextFrame + "" + nextThrow).style.backgroundColor == _disabledColor);
}


function advance_to_next_throw ( )
{
	var nextFrame = _activeFrame;
	var nextThrow = _activeThrow;

	nextThrow++;
	if ( (nextThrow == 2) && (nextFrame < 9) )
	{
		nextThrow = 0;
		nextFrame++;
	}
	else if ( nextFrame == 9 )
	{
		if ( nextThrow == 3 )
		{
			nextThrow--;
		}
	}

	set_active_frame ( nextFrame, nextThrow );
}

function convert_scorecard_to_array ( )
{

	var arr = [];

	for ( var frameIndex = 0; frameIndex <= 9; frameIndex++ )
	{
		arr.push ( document.getElementById(frameIndex + "0").innerHTML );
		arr.push ( document.getElementById(frameIndex + "1").innerHTML );

		if ( frameIndex == 9 )
		{
			arr.push ( document.getElementById(frameIndex + "2").innerHTML );
		}
	}

	return arr;
}

function get_next_throw_index ( arr, currentIndex )
{

	if ( currentIndex < 18 )		// Not in frame 10
	{
		if ( arr[currentIndex] == "X" )
		{
			currentIndex += 2;
		}
		else
		{
			currentIndex += 1;
		}
	}
	else
	{
		currentIndex += 1;
	}

	return currentIndex;

}

function convert_scorecard_index_to_val ( arr, index, entry )
{
	var val = 0;

	if ( entry == "X" )
	{
		val = 10;
	}
	else if ( entry == "." || entry == "" )
	{
		val = 0;
	}
	else if ( entry == "/" )
	{
		val += 10;
		val -= arr[index - 1];
	}
	else
	{
		val = parseInt(entry);
	}

	return val;
}

function calculate_score_for_frame ( arr, frame )
{
	var frameIndex = frame * 2;
	var score = 0;
	var peekIndex;

	if ( arr[frameIndex] == "X" )
	{
		score += 10;
		peekIndex = get_next_throw_index ( arr, frameIndex );
		if ( peekIndex < 21 )
		{
			score += convert_scorecard_index_to_val ( arr, peekIndex, arr[peekIndex] );
			peekIndex = get_next_throw_index ( arr, peekIndex );
			if ( peekIndex < 21 )
			{
				score += convert_scorecard_index_to_val ( arr, peekIndex, arr[peekIndex] );
			}
		}
	}
	else if ( arr[frameIndex + 1] == "/" )
	{
		frameIndex++;
		score += 10;
		peekIndex = get_next_throw_index ( arr, frameIndex );
		if ( peekIndex < 21 )
		{
			score += convert_scorecard_index_to_val ( arr, peekIndex, arr[peekIndex] );
		}
	}
	else
	{
		score += convert_scorecard_index_to_val ( arr, peekIndex, arr[frameIndex] );
		score += convert_scorecard_index_to_val ( arr, peekIndex, arr[frameIndex + 1] );
	}				

	return score;
}

function calculate_score ( )
{

	var frameScore = 0;
	var score = 0;
	var arr = convert_scorecard_to_array ( );

	for ( var frameIndex = 0; frameIndex < 10; frameIndex++ )
	{
		frameScore = calculate_score_for_frame ( arr, frameIndex );
		score += frameScore;

		if ( is_frame_closed(arr, frameIndex) === true )
		{
			document.getElementById("frameScore" + frameIndex).innerHTML = frameScore;
			document.getElementById("frameScore" + frameIndex).style.color = "blue";
		}
		else
		{
			document.getElementById("frameScore" + frameIndex).innerHTML = frameScore;
			document.getElementById("frameScore" + frameIndex).style.color = "gray";
		}
	}

	document.getElementById("totalScore").innerHTML = "Score: " + score;

	var openPoints = calculate_open_points ( arr );
	document.getElementById("openPoints").innerHTML = "Open Points: " + openPoints;


	document.getElementById("extraPoints").innerHTML = "Extra Points: " + parseInt(score - openPoints);


	var avg = calculate_average_per_frame ( arr );
	document.getElementById("avgPerFrame").innerHTML = "Average Per Frame: " + avg;


	
	var goal = document.getElementById("txt_goal").value;
	var fromGoal = parseInt(goal - score);
	
	var maxPoints = calculate_max_points ( arr );
	document.getElementById("maxPoints").innerHTML = "Max points that can be achieved: " + maxPoints;

	if ( fromGoal < 0 )
	{
		document.getElementById("fromGoal").innerHTML = "GOAL ACHIEVED!";
	}
	else if ( maxPoints < goal )
	{
		document.getElementById("fromGoal").innerHTML = "Goal missed :-(";
	}
	else
	{
		document.getElementById("fromGoal").innerHTML = fromGoal + " points to go!";
	}

}


function calculate_average_per_frame ( arr )
{
	var avg = 0;

	for ( var index = 0; index < _activeFrame && index < 9; index++ )
	{
		avg += calculate_open_points_in_frame ( arr, index );
	}

	avg /= _activeFrame;

	return parseInt(avg);
}


function calculate_max_points ( arr )
{

	var score = 0;

	console.info ( "Arr 1", arr );

	for ( var index = 0; index < 21; index += 2 )
	{
		if ( arr[index] != "X" || index >= 18 )
		{
			if ( arr[index] == "" )
			{
				arr[index] = "X";
				if ( index >= 18 )
				{
					arr[index + 1] = "X";
					arr[index + 2] = "X";
					index++;
				}
			}
			else if ( arr[index + 1] == "" && index < 18 )
			{
				arr[index + 1] = "/";
			}
			else if ( index >= 18 && arr[index + 1] == "" )
			{
				console.log ( "Index adding X", index );
				arr[index + 1] = "X";
				arr[index + 2] = "X";
				index++;
			}
			else if ( index >= 18 && arr[index + 2] == "" )
			{
				arr[index + 2] = "X";
			}
		}
	}

	console.info ( "Arr 2", arr );

	for ( var frameIndex = 0; frameIndex < 10; frameIndex++ )
	{
		frameScore = calculate_score_for_frame ( arr, frameIndex );
		score += frameScore;
	}

	return score;

}


function calculate_open_points ( arr )
{

	var openPoints = 0;

	for ( var index = 0; index < 21; index++ )
	{
		if ( arr[index] == "X" )
		{
			openPoints += 10;
		}
		else if ( arr[index] == "/" )
		{
			openPoints += 10;
			openPoints -= arr[index - 1];
		}
		else if ( arr[index] == "." )
		{
			openPoints += 0;
		}
		else if ( arr[index] == "" )
		{
			openPoints += 0;
		}
		else
		{
			openPoints += parseInt(arr[index]);
		}
	}

	return openPoints;

}



function calculate_open_points_in_frame ( arr, index )
{

	var openPoints = 0;
	index *= 2;

	if ( arr[index] == "X" )
	{
		openPoints += 10;
	}
	else if ( arr[index + 1] == "/" )
	{
		openPoints += 10;
	}
	else
	{
	
		if ( arr[index] != "." && arr[index] != ""  )
		{
			openPoints += parseInt(arr[index]);
		}

		if ( arr[index + 1] != "." && arr[index + 1] != "" )
		{
			openPoints += parseInt(arr[index + 1]);
		}

	}

	return openPoints;

}


function is_frame_closed ( arr, frame )
{
	var frameIndex = frame * 2;
	var score = 0;
	var peekIndex;
	var frameClosed = false;

	if ( arr[frameIndex] == "X" )
	{
		peekIndex = get_next_throw_index ( arr, frameIndex );
		if ( peekIndex < 21 )
		{
			if ( arr[peekIndex] != "" )
			{
				peekIndex = get_next_throw_index ( arr, peekIndex );
				if ( peekIndex < 21 )
				{
					if ( arr[peekIndex] != "" )
					{
						frameClosed = true;
					}
				}
			}
		}
	}
	else if ( arr[frameIndex + 1] == "/" )
	{
		if ( arr[frameIndex + 2] != "" )
		{
			frameClosed = true;
		}
	}
	else
	{
		if ( arr[frameIndex] != "" && arr[frameIndex + 1] != "")
		{
			frameClosed = true;
		}
	}				

	return frameClosed;
}