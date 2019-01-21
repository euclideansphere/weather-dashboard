import React from 'react';
import {
	Button
} from '@salesforce/design-system-react';

const Header = ({
	onTemperatureUnitButtonClick,
	temperatureUnitLabel
}) => (
	<div className="slds-page-header">
		<div className="slds-page-header__row">
		<div className="slds-page-header__col-title">
			<div className="slds-page-header__title"
				title="Penrod Weather Dashboard">
					Penrod Weather Dashboard
			</div>
		</div>
		<div className="slds-page-header__col-actions">
			<div className="slds-page-header__controls">
				<Button onClick={onTemperatureUnitButtonClick} label={temperatureUnitLabel} />
			</div>
			</div>
		</div>
	</div>
);

export default Header;
