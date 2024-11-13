const GenderCheckbox = ({handleChange,gender}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Male</span>
					<input name="gender" value="male" type='radio' className='radio border-blue-500 checked:bg-blue-500' onChange={handleChange} checked={gender==='male'}/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Female</span>
					<input name="gender" value="female" type='radio' className='radio border-blue-500 checked:bg-blue-500' onChange={handleChange} checked={gender==='female'}/>
				</label>
			</div>	
		</div>
	);
};
export default GenderCheckbox;