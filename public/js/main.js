const socket = window.io('');

socket.on('tick', function ({ second, is_bet }){
	$('.count_down').text(second);
	const $status = $('.status');
	const $btnStatus = $('.btn-status');
	if(is_bet){
		$status.text('Đang đặt lệnh');
		$btnStatus.removeClass('btn-secondary').addClass('btn-info');
	} else {
		$status.text('Chờ kết quả');
		$btnStatus.removeClass('btn-info').addClass('btn-secondary');
	}
})

socket.on('ACCOUNT', function ({ trial_count, expired_tool_at, is_expired_tool, user_mode }) {
	$('.trial_count').text(trial_count);
	$('.expired_tool_at').text(expired_tool_at);
	$('.trial_count_group').attr('data-user_mode', user_mode).attr('data-trial_count', trial_count);
	$('.expired_tool_at_group').attr('data-user_mode', user_mode).attr('data-is_expired', is_expired_tool);
})

socket.on('receive result', function ({ guess }) {
	const $btnUp = $('.btn-up');
	const $btnDown = $('.btn-down');
	if(guess === 'up'){
		$btnUp.removeClass('btn-light').addClass('btn-success');
		$btnDown.removeClass('btn-danger').addClass('btn-light');
	} else if(guess === 'down') {
		$btnUp.removeClass('btn-success').addClass('btn-light');
		$btnDown.removeClass('btn-light').addClass('btn-danger');
	} else {
		$btnUp.removeClass('btn-success').addClass('btn-light');
		$btnDown.removeClass('btn-danger').addClass('btn-light');
	}
})
