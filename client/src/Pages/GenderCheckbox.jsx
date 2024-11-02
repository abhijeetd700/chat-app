const GenderCheckbox = () => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Male</span>
					<input name="gender"  type='radio' className='radio border-blue-500 checked:bg-blue-500' />
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Female</span>
					<input name="gender"  type='radio' className='radio border-blue-500 checked:bg-blue-500' />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;